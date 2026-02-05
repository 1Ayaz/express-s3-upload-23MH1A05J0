const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalFilename: {
        type: String,
        required: true
    },
    s3Key: {
        type: String,
        required: true,
        unique: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('File', fileSchema);
