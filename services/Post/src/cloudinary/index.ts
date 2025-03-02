/** Local dependencies */
import {
  CLOUDINARY_CONFIG_SCHEMA,
  CLOUDINARY_CONFIG_TYPE,
} from '../schema/mediaConf.schema';

const cloudinary = require('cloudinary').v2;

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('config');

const configuration: CLOUDINARY_CONFIG_TYPE = config.get(
  'CLOUDINARY_CONFIGURATION'
);

if (CLOUDINARY_CONFIG_SCHEMA.parse(configuration))
  cloudinary.config(configuration);

const postImages = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'm4v'],
    folder: 'vwanu/post',
    resource_type: 'auto',
  },
});


export const postStorage = multer({ storage: postImages });



