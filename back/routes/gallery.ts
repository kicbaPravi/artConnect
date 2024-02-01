import express from 'express';
import {
  uploadImage,
  getAllImages,
  deleteImage,
  updateImageInfo
} from '../controllers/gallery.js';
import { verifyToken } from '../verifyToken.js';
import multer from 'multer';
import moment from 'moment';

const router = express.Router();

// Uploading new image

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) =>
    cb(null, `${moment().format('DD.MM.YYYY.')}_${file.originalname}`)
});

const upload = multer({ storage });

router.put(
  '/upload',
  verifyToken as any,
  upload.single('file') as any,
  uploadImage as any
);

// Get all images

router.get('/images', verifyToken as any, getAllImages as any);

// Update image info

router.patch(
  '/update-image-info/:id',
  verifyToken as any,
  updateImageInfo as any
);

// Delete image

router.delete('/delete-image/:id', verifyToken as any, deleteImage as any);

export default router;
