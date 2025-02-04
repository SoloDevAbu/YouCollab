import { S3Client } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'
dotenv.config();

export const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY_ID
    }
});