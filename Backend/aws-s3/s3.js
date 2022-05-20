import fs from "fs";
import S3 from 'aws-sdk/clients/s3.js';
import dotenv from "dotenv";
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

// uploads a file to s3
const upload = (folder, file) => {
  const fileStream = fs.createReadStream(file.path);
  const params = {
    Bucket: bucketName,
    Body: fileStream,
    Key: folder+'/'+file.originalname,
    Etag: 'haloo'
  }
  return s3.upload(params).promise()
}

// delete a file from s3
const deleteFromS3 = (fileKey) => {
  const params = {
    Bucket: bucketName,
    Key: fileKey
  }
  return s3.deleteObject(params).promise();
}

// retrieve files meta-data from s3
const getFilesMetaData = (folderName) => {
  const params = {
    Bucket: bucketName,
    Delimiter: '/',
    Prefix: folderName+'/'
  }
  return s3.listObjects(params).promise();
}

// downloads a file from s3
function download(fileKey) {
  const params = {
    Key: fileKey,
    Bucket: bucketName
  }
  return s3.getObject(params).createReadStream();
}

export { upload, download, getFilesMetaData, deleteFromS3 };