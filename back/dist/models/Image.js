import mongoose from 'mongoose';
const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    technique: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['inProgress', 'stock', 'sold'],
        required: true
    },
    imagePath: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    soldToPersonName: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
export default mongoose.model('Image', ImageSchema);
//# sourceMappingURL=Image.js.map