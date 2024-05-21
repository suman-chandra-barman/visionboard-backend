import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          fs.unlinkSync(path);
          resolve(result);
        }

        // delete a file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve('File is deleted.');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
