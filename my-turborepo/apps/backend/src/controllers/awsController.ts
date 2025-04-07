import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../config/aws.config";
import dotenv from 'dotenv';

dotenv.config();

export const getPresignedUrlForUpload = async (fileName: string, contentType: string): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: `editor/uploads/${fileName}`,
    ContentType: contentType
  });
  
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

export const getPresignedUrlForView = async (key: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: `editor/uploads/${key}`
  });

  return getSignedUrl(s3Client, command);
};

export const deleteFile = async (key: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: `editor/uploads/${key}`
  });

  await s3Client.send(command);
};
