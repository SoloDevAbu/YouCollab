const { Youtuber } = require("../db/db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const createYoutuber = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            mdg: "provide all the details"
        })
    }

    try {
        const existingYoutuber = await Youtuber.findOne({email});
        if(existingYoutuber) {
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

        const token = jwt.sign({youtuberId: youtuber._id}, JWT_SECRET, {expiresIn: '7d'})

        res.status(201).cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: 'User created successfully',
        });        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
const loginYoutuber = async (req, res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({
                message: 'Email and Password are required'
            })
        }

        const youtuber = await Youtuber.findOne({email});
        if(!youtuber) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        const isMatched = await bcrypt.compare(password, youtuber.password);

        if (!isMatched) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { youtuberId: youtuber._id },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).cookie('token', `Bearer ${token}`, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: 'User signed in successfully',
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const updateYoutuber = async (req, res) => {
    const { youtuberId } = req.youtuber;

    const {name, password, newPassword} = req.body;

    try {
        const youtuber = await Youtuber.findById(youtuberId)
        if(!youtuber) {
            return res.status(404).json({ message: 'User not found' });
        }

        if(newPassword) {
            if(!password) {
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

const logoutYoutuber = async (req, res) => {
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

module.exports = {
    createYoutuber,
    loginYoutuber,
    updateYoutuber,
    logoutYoutuber,
}