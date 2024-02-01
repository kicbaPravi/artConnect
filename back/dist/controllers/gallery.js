import ImageSchema from '../models/Image.js';
import fs from 'fs';
//get all images
export const getAllImages = async (req, res, next) => {
    const { authUserId, page, ...otherFilters } = req.query;
    const pageNumber = parseInt(String(req.query.page), 10) || 0;
    const imagesPerPage = 8;
    try {
        const filteredImages = await ImageSchema.find({
            createdBy: authUserId,
            ...otherFilters
        })
            .skip(pageNumber ? (pageNumber - 1) * imagesPerPage : 0)
            .limit(imagesPerPage);
        const totalRecords = await ImageSchema.countDocuments({
            createdBy: authUserId,
            ...otherFilters
        });
        const totalPages = Math.ceil(totalRecords / imagesPerPage);
        if (!!filteredImages.length) {
            return res.status(200).send({
                images: filteredImages,
                totalRecords,
                totalPages,
                currentPage: page ? Number(page) : 1
            });
        }
        res.status(200).send([]);
    }
    catch (err) {
        next(err);
    }
};
// upload new image
export const uploadImage = async (req, res, next) => {
    try {
        const { name, loggedUserId, technique, width, height, status, location, year, number, price, soldToPersonName } = req.body;
        // Create a new instance of the ImageSchema model
        const newImage = new ImageSchema({
            name,
            createdBy: loggedUserId,
            technique,
            width,
            height,
            status,
            imagePath: req.file.path,
            location,
            year,
            number,
            price,
            soldToPersonName
        });
        // Save the new image document to the database
        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// update image info
export const updateImageInfo = async (req, res, next) => {
    try {
        const imageId = req.params.id;
        const { name, technique, width, height, status, location, year, number, price, soldToPersonName } = req.body;
        const existingImage = await ImageSchema.findById(imageId);
        if (!existingImage) {
            return res.status(404).json({ error: 'Image not found' });
        }
        const updatedImage = await ImageSchema.findOneAndUpdate({ _id: imageId }, req.body, { new: true });
        return res.status(200).json(updatedImage);
    }
    catch (error) {
        console.error('Error updating image:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
// delete image
export const deleteImage = async (req, res, next) => {
    const image = await ImageSchema.findById(req.params.id);
    if (!image) {
        return res.status(404).json({ error: 'Image not found' });
    }
    try {
        // Delete the file from the server
        const imagePath = image.imagePath;
        fs.unlinkSync(imagePath);
        // Delete the image information from the database
        const deletedImage = await ImageSchema.findByIdAndDelete(req.params.id);
        if (deletedImage) {
            return res.json({ message: 'Image deleted successfully' });
        }
        else {
            return res.status(404).json({ error: 'Image not found' });
        }
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=gallery.js.map