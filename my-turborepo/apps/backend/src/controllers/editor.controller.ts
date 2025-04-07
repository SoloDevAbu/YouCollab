import { Request, Response } from 'express';
import { EditorRequest } from '../types';
import Editor from '../models/editor.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createEditor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;
    const existingEditor = await Editor.findOne({ email });
    
    if (existingEditor) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Editor.create({ name, email, password: hashedPassword });

    return res.status(201).json({
      success: true,
      message: 'Editor created successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateProfile = async (req: EditorRequest, res: Response): Promise<Response> => {
  try {
    const { name, currentPassword, newPassword } = req.body;
    const editor = await Editor.findById(req.editor?.id);

    if (!editor) {
      return res.status(404).json({
        success: false,
        message: 'Editor not found'
      });
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password required'
        });
      }

      const isValid = await bcrypt.compare(currentPassword, editor.password);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid current password'
        });
      }

      editor.password = await bcrypt.hash(newPassword, 10);
    }

    editor.name = name || editor.name;
    await editor.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false, 
      message: 'Error updating profile'
    });
  }
};

export const logout = async (req: EditorRequest, res: Response): Promise<Response> => {
  try {
    res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error logging out'
    });
  }
};
