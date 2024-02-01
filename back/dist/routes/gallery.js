import express from 'express';
import { uploadImage, getAllImages, deleteImage, updateImageInfo } from '../controllers/gallery.js';
import { verifyToken } from '../verifyToken.js';
import multer from 'multer';
import moment from 'moment';
const router = express.Router();
// Uploading new image
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, `${moment().format('DD.MM.YYYY.')}_${file.originalname}`)
});
const upload = multer({ storage });
router.put('/upload', verifyToken, upload.single('file'), uploadImage);
// Get all images
router.get('/images', verifyToken, getAllImages);
// Update image info
router.patch('/update-image-info/:id', verifyToken, updateImageInfo);
// Delete image
router.delete('/delete-image/:id', verifyToken, deleteImage);
export default router;
//# sourceMappingURL=gallery.js.map