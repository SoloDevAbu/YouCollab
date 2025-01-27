const { Editor } = require("../db/db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require("../config/nodemailer");

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const createEditor = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "Provide all the details"
        });
    }

    try {
        const existingEditor = await Editor.findOne({email});
        if(existingEditor) {
            return res.status(409).json({
                success: false,
                message: 'Editor already exists'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const editor = await Editor.create({
            name,
            email,
            password: hashPassword
        });

        const token = jwt.sign(
            {editorId: editor._id, name: editor.name, email: editor.email}, 
            JWT_SECRET, 
            {expiresIn: '7d'}
        );

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
            text: `Welcome to YouCollab. Your account has been created successfully with email id ${email}`
        };

        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            message: 'Editor created successfully',
        });        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const loginEditor = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: 'Email and Password are required'
        });
    }

    try {
        const editor = await Editor.findOne({email});
        if(!editor) {
            return res.status(404).json({ message: 'Editor not found' });
        }

        const isMatched = await bcrypt.compare(password, editor.password);

        if (!isMatched) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {editorId: editor._id, name: editor.name, email: editor.email}, 
            JWT_SECRET, 
            {expiresIn: '7d'}
        );

        res.status(201).cookie('token', token, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.json({
            success: true,
            message: 'Editor signed in successfully',
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const updateEditor = async (req, res) => {
    const { editorId } = req.editor;
    const {name, password, newPassword} = req.body;

    try {
        const editor = await Editor.findById(editorId);
        if(!editor) {
            return res.status(404).json({ message: 'Editor not found' });
        }

        if(newPassword) {
            if(!password) {
                return res.status(400).json({
                    message: 'Current password is required to set a new password.'
                });
            }

            const isMatched = await bcrypt.compare(password, editor.password);
            if (!isMatched) {
                return res.status(401).json({
                    message: 'Current password is incorrect.'
                });
            }

            editor.password = await bcrypt.hash(newPassword, 10);
        }

        await Editor.findByIdAndUpdate(editorId, {
            name,
            ...(newPassword && { password: await bcrypt.hash(newPassword, 10) })
        });

        return res.status(200).json({
            success: true,
            message: 'Editor updated successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const logoutEditor = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({
            success: true,
            message: "Logout successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const sendVerifyOtp = async (req, res) => {
    try {
        const { editorId } = req.editor;
        const editor = await Editor.findById(editorId);

        if (editor.isAccountVerified) {
            return res.json({
                success: true,
                message: 'Account already verified'
            });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        editor.verifyOtp = otp;
        editor.verifyOtpExpiredAt = Date.now() + (5 * 60 * 1000);

        await editor.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: editor.email,
            subject: "Account verification OTP",
            text: `Your verification OTP is ${otp}. OTP is valid for 5 minutes.`
        };

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: 'Verification OTP sent successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const verifyEmail = async (req, res) => {
    const { editorId } = req.editor;
    const { otp } = req.body;

    if (!editorId || !otp) {
        return res.json({
            success: false,
            message: 'Missing details'
        });
    }

    try {
        const editor = await Editor.findById(editorId);

        if (!editor) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }

        if (editor.verifyOtp === '' || editor.verifyOtp !== otp) {
            return res.json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        if (editor.verifyOtpExpiredAt < Date.now()) {
            return res.json({
                success: false,
                message: 'OTP expired'
            });
        }

        editor.isAccountVerified = true;
        editor.verifyOtp = '';
        editor.verifyOtpExpiredAt = 0;

        await editor.save();

        return res.json({
            success: true,
            message: 'Email verified successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const isAuthenticated = async (req, res) => {
    try {
        return res.json({
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({
            success: false,
            message: 'Email is required'
        });
    }

    try {
        const editor = await Editor.findOne({ email });
        if (!editor) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        editor.verifyOtp = otp;
        editor.verifyOtpExpiredAt = Date.now() + (5 * 60 * 1000);

        await editor.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: editor.email,
            subject: "Password reset OTP",
            text: `Your OTP for resetting the password is ${otp}. OTP is valid for 5 minutes.`
        };

        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            message: 'Reset OTP sent successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        const editor = await Editor.findOne({ email });

        if (!editor) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }

        if (editor.verifyOtp === '' || editor.verifyOtp !== otp) {
            return res.json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        if (editor.verifyOtpExpiredAt < Date.now()) {
            return res.json({
                success: false,
                message: 'OTP expired'
            });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        editor.password = hashPassword;
        editor.verifyOtp = '';
        editor.verifyOtpExpiredAt = 0;

        await editor.save();

        return res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getEditor = async (req, res) => {
    const { editorId } = req.editor;
    try {
        const editor = await Editor.findById(editorId);

        if (!editor) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            editorData: {
                name: editor.name,
                email: editor.email,
                isAccountVerified: editor.isAccountVerified
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export default {
    createEditor,
    loginEditor,
    updateEditor,
    logoutEditor,
    sendVerifyOtp,
    verifyEmail,
    isAuthenticated,
    sendResetOtp,
    resetPassword,
    getEditor
};