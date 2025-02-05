import { Editor, YoutubeChannel, Youtuber } from '../db/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailer.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const createYoutuber = async (req, res) => {
    const { name, email, password, userType } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            mdg: "provide all the details"
        })
    }

    try {
        const existingYoutuber = await Youtuber.findOne({ email });
        if (existingYoutuber) {
            return res.status(409).json({
                success: false,
                message: 'User already exists'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const youtuber = await Youtuber.create({
            name,
            email,
            password: hashPassword
        })

        const token = jwt.sign(
            { youtuberId: youtuber._id, name: youtuber.name, email: youtuber.email, userType },
            JWT_SECRET,
            { expiresIn: '7d' }
        )

        // res.status(201).cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // })

        res.status(201).cookie('token', token, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to YouCollab",
            text: `Welcome to YouCollab. You account has been created successfully with email id ${email}`
        }

        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
export const loginYoutuber = async (req, res) => {
    const { email, password, userType } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and Password are required'
        })
    }
    try {

        const youtuber = await Youtuber.findOne({ email });
        if (!youtuber) {
            return res.status(404).json({ message: 'Youtuber not found' });
        }

        const isMatched = await bcrypt.compare(password, youtuber.password);

        if (!isMatched) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { youtuberId: youtuber._id, name: youtuber.name, email: youtuber.email, userType },
            JWT_SECRET,
            { expiresIn: '7d' }
        )

        // res.status(201).cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // })
        res.cookie('token', token, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const youtubeAccount = await YoutubeChannel.findOne({
            youtuberId: youtuber._id
        })
        
        if (youtubeAccount) {
            const youtubeToken = jwt.sign(youtubeAccount.toObject(), process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            res.cookie('youtubeAuth', youtubeToken, {
                httpOnly: false,
                secure: false,
                sameSite: 'lax',
                maxAge: 1 * 60 * 60 * 1000,
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User signed in successfully',
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
export const updateYoutuber = async (req, res) => {
    const { youtuberId } = req.youtuber;

    const { name, password, newPassword } = req.body;

    try {
        const youtuber = await Youtuber.findById(youtuberId)
        if (!youtuber) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (newPassword) {
            if (!password) {
                return res.status(400).json({
                    message: 'Current password is required to set a new password.'
                });
            }

            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                return res.status(401).json({
                    message: 'Current password is incorrect.'
                });
            }

            youtuber.password = await bcrypt.hash(newPassword, 10);
        }

        await Youtuber.findByIdAndUpdate(youtuberId, {
            name,
            ...(newPassword && { password: await bcrypt.hash(newPassword, 10) })
        });

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

export const logoutYoutuber = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({
            success: true,
            message: "Logou successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const sendVerifyOtp = async (req, res) => {

    try {
        const { youtuberId } = req.youtuber;

        const youtuber = await Youtuber.findById(youtuberId);

        if (youtuber.isAccountVerified) {
            return res.json({
                success: true,
                message: 'Account already verified'
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        youtuber.verifyOtp = otp;
        youtuber.verifyOtpExpiredAt = Date.now() + (5 * 60 * 1000);

        await youtuber.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: youtuber.email,
            subject: "Account verification OTP",
            text: `Your verification OTP is ${otp}. OTP is valid till 5 minutes after receiving the otp`
        }

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: 'Verification OTP sent successfully'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const { youtuberId } = req.youtuber;
    const { otp } = req.body;

    if (!youtuberId || !otp) {
        return res.json({
            success: false,
            message: 'Missing details'
        })
    }

    try {
        const youtuber = await Youtuber.findById(youtuberId);

        if (!youtuber) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        if (youtuber.verifyOtp === '' || youtuber.verifyOtp !== otp) {
            return res.json({
                success: false,
                message: 'Invalid OTP'
            })
        }

        if (youtuber.verifyOtpExpiredAt < Date.now()) {
            return res.json({
                success: false,
                message: 'OTP Expired'
            })
        }

        youtuber.isAccountVerified = true;
        youtuber.verifyOtp = '';
        youtuber.verifyOtpExpiredAt = 0;

        await youtuber.save();

        return res.json({
            success: true,
            message: 'Email verified successfully'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({
            success: true,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({
            success: false,
            message: 'Email is required'
        })
    }

    try {
        const youtuber = await Youtuber.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        youtuber.verifyOtp = otp;
        youtuber.verifyOtpExpiredAt = Date.now() + (5 * 60 * 1000);

        await youtuber.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: youtuber.email,
            subject: "Account verification OTP",
            text: `Your OTP for Re-Set password is ${otp} OTP is valid till 5 minutes after receiving the otp`
        }

        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            message: 'Reset OTP sent successfully'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({
            success: false,
            message: 'All the fields are required'
        })
    }

    try {
        const youtuber = await Youtuber.findOne({ email });

        if (!youtuber) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        if (youtuber.resetOtp === '' || youtuber.resetOtp !== otp) {
            return res.json({
                success: false,
                message: 'Invalid OTP'
            })
        }

        if (youtuber.resetOtpExpiredAt < Date.now()) {
            return res.json({
                success: false,
                message: 'OTP expired'
            })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        youtuber.password = hashPassword;
        youtuber.resetOtp = '';
        youtuber.resetOtpExpiredAt = 0;

        await youtuber.save();

        return res.json({
            success: true,
            message: 'Password changed successfullyS'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const getYoutuber = async (req, res) => {
    const { youtuberId } = req.youtuber;
    try {
        const youtuber = await Youtuber.findById(youtuberId);

        if (!youtuber) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        res.json({
            success: true,
            youtuberData: {
                name: youtuber.name,
                email: youtuber.email,
                isAccountVerified: youtuber.isAccountVerified
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const addEditor = async (req, res) => {
    const { editorEmail } = req.body;
    const { youtuberId } = req.youtuber;

    try {
        const editor = await Editor.findOne({ email: editorEmail });

        if (!editor) {
            return res.status(404).json({
                success: false,
                message: 'No Editor Found'
            });
        }

        await Youtuber.findByIdAndUpdate(youtuberId, {
            $addToSet: { editors: editor._id }
        });

        await Editor.findByIdAndUpdate(editor._id, {
            youtuber: youtuberId
        })

        res.status(200).json({
            success: true,
            message: 'Editor Added Successfully'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getEditors = async (req, res) => {
    const { youtuberId } = req.youtuber;
    try {
        const youtuber = await Youtuber.findById(youtuberId).populate('editors', '_id name email');

        if (!youtuber) {
            return res.status(404).json({
                success: false,
                message: 'YouTuber not found'
            });
        }

        res.status(200).json({
            success: true,
            editors: youtuber.editors
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const removeEditor = async (req, res) => {
    const { editorId } = req.params;
    const { youtuberId } = req.youtuber;

    try {
        const editor = await Editor.findById(editorId);
        const youtuber = await Youtuber.findById(youtuberId);

        if (!youtuber) {
            return res.status(404).json({
                success: false,
                message: 'No Youtuber Found'
            })
        }

        if (!editor) {
            return res.status(404).json({
                success: false,
                message: 'Editor not Found'
            })
        }

        if (!youtuber.editors.includes(editorId)) {
            return res.status(404).json({
                success: false,
                message: 'Editor not found in the list'
            });
        }

        await Youtuber.findByIdAndUpdate(
            youtuberId,
            { $pull: { editors: editorId } },
            { new: true }
        );

        await Editor.findByIdAndUpdate(editor._id,
            { youtuber: null },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: 'Editor Removed Successfully'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}