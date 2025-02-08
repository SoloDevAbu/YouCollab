import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../config/aws-S3Config.js";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

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

export const downloadVideoFromS3 = async (fileName) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key: `editor/uploads/${fileName}`,
        });

        const { Body } = await s3Client.send(command);

        const tempDir = os.tmpdir();  // Works cross-platform (Windows, Linux, Mac)
        const tempFilePath = path.join(tempDir, fileName);

        // Ensure the directory exists
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        return new Promise((resolve, reject) => {
            const stream = fs.createWriteStream(tempFilePath);
            Body.pipe(stream)
                .on('finish', () => {
                    console.log("Downloaded file to:", tempFilePath);
                    // Verify the file exists after download
                    if (fs.existsSync(tempFilePath)) {
                        console.log("File exists and is ready for upload.");
                        resolve(tempFilePath);
                    } else {
                        reject(new Error("File was not written to disk."));
                    }
                })
                .on('error', (error) => {
                    console.error("Error writing file to disk:", error);
                    reject(error);
                });
        });
    } catch (error) {
        console.error("Error downloading video from S3:", error);
        throw new Error("Failed to download video from S3");
    }
};

export const deleteVideoFromAws = async (fileName) => {
    try {
        if (!fileName) {
            throw new Error("Invalid file name");
        }

        const key = `editor/uploads/${fileName}`;
        console.log(`Attempting to delete: ${key}`);

        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key: key,
        });

        await s3Client.send(command);
        console.log(`Successfully deleted: ${fileName} from S3`);
    } catch (error) {
        console.error("Error deleting video from S3:", error);
        throw new Error("Failed to delete video from S3");
    }
};