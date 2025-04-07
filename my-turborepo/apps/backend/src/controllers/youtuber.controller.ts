import { Request, Response } from 'express';
import { YoutuberRequest } from '../types';
import Youtuber from '../models/youtuber.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createYoutuber = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    const existingYoutuber = await Youtuber.findOne({ email });
    if (existingYoutuber) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const youtuber = await Youtuber.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: youtuber._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    return res.status(201).json({
      success: true,
      message: 'Youtuber created successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const loginYoutuber = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const youtuber = await Youtuber.findOne({ email });
    if (!youtuber) {
      return res.status(404).json({
        success: false,
        message: 'Youtuber not found'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, youtuber.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    const token = jwt.sign(
      { id: youtuber._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const addEditor = async (req: YoutuberRequest, res: Response): Promise<Response> => {
  try {
    const { editorEmail } = req.body;
    const editor = await Editor.findOne({ email: editorEmail });

    if (!editor) {
      return res.status(404).json({
        success: false,
        message: 'Editor not found'
      });
    }

    await Youtuber.findByIdAndUpdate(req.youtuber?.id, {
      $addToSet: { editors: editor._id }
    });

    await Editor.findByIdAndUpdate(editor._id, {
      youtuber: req.youtuber?.id
    });

    return res.status(200).json({
      success: true,
      message: 'Editor added successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error adding editor'
    });
  }
};

export const removeEditor = async (req: YoutuberRequest, res: Response): Promise<Response> => {
  try {
    const { editorId } = req.params;

    await Youtuber.findByIdAndUpdate(req.youtuber?.id, {
      $pull: { editors: editorId }
    });

    await Editor.findByIdAndUpdate(editorId, {
      youtuber: null
    });

    return res.status(200).json({
      success: true,
      message: 'Editor removed successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error removing editor'
    });
  }
};

export const sendVerifyOtp = async (req: YoutuberRequest, res: Response): Promise<Response> => {
  try {
    const youtuber = await Youtuber.findById(req.youtuber?.id);
    if (!youtuber) {
      return res.status(404).json({
        success: false,
        message: 'Youtuber not found'
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    youtuber.verificationOtp = otp;
    await youtuber.save();

    // Send email with OTP
    // Add your email sending logic here

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error sending OTP'
    });
  }
};
