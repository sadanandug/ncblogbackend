require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const buketName = process.env.AWS_BUCKET_NAME;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});


export const s3Uploadv3 = async (files: Express.Multer.File[]) => {
  try {
    const s3client = new S3Client();
    console.log("files: ", files);
    

    const params = files.map((file) => {
      return {
        Bucket: buketName,
        Key: `uploads/${file.originalname}`,
        Body: file.buffer,
      };
    });

    return await Promise.all(
      params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
  } catch (error) {
    console.log('s3 error', error);
  }
};


export const downloadFileFromS3 = async () => {
  const params = {
    Bucket: buketName,
    Key: `uploads/Arnold_Schwarzenegger_1974.jpg`,
    Expires: 3600, // URL expiration time in seconds (optional)
  };

  // const fileStream = require('fs').createWriteStream(destinationPath);

  // return new Promise((resolve, reject) => {
  //   s3.getObject(params)
  //     .createReadStream()
  //     .on('error', (error: Error) => {
  //       reject(error);
  //     })
  //     .pipe(fileStream)
  //     .on('close', () => {
  //       resolve();
  //     });
  // });

  const url = await s3.getSignedUrlPromise('getObject', params);
  console.log("url: ", url);
  
  return url;
}
