import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../config/aws-S3Config.js";
import dotenv from 'dotenv';

dotenv.config();

export const getAwsPresignedUrlForUpload = async (fileName, contentType) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: `editor/uploads/${fileName}`,
        ContentType: contentType
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 120 });
    return url;
}

export const getAwsPresignedUrlForShowVideo = async (key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: `editor/uploads/${key}`,
    })

    const url = await getSignedUrl(s3Client, command)
    return url;
}