const AWS = require('aws-sdk');
const File = require('../models/File');
const { v4: uuidv4 } = require('uuid');

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Show upload page
exports.getUpload = (req, res) => {
    res.render('upload', {
        username: req.session.username,
        message: null,
        error: null
    });
};

// Handle file upload
exports.postUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.render('upload', {
                username: req.session.username,
                message: null,
                error: 'Please select a file to upload'
            });
        }

        // Generate unique S3 key
        const s3Key = `${uuidv4()}-${req.file.originalname}`;

        // Upload to S3
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: s3Key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        };

        await s3.upload(params).promise();

        // Save file metadata to MongoDB
        const file = new File({
            originalFilename: req.file.originalname,
            s3Key: s3Key,
            uploadedBy: req.session.userId
        });

        await file.save();

        res.render('upload', {
            username: req.session.username,
            message: 'File uploaded successfully!',
            error: null
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.render('upload', {
            username: req.session.username,
            message: null,
            error: 'An error occurred during file upload'
        });
    }
};

// Show files list
exports.getFiles = async (req, res) => {
    try {
        const files = await File.find({ uploadedBy: req.session.userId })
            .sort({ uploadDate: -1 });

        res.render('files', {
            username: req.session.username,
            files: files
        });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.render('files', {
            username: req.session.username,
            files: [],
            error: 'An error occurred while fetching files'
        });
    }
};

// Handle file download
exports.downloadFile = async (req, res) => {
    try {
        const fileId = req.params.id;

        // Find file in database
        const file = await File.findOne({
            _id: fileId,
            uploadedBy: req.session.userId
        });

        if (!file) {
            return res.status(404).send('File not found');
        }

        // Get file from S3
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: file.s3Key
        };

        const s3Stream = s3.getObject(params).createReadStream();

        // Set headers
        res.setHeader('Content-Disposition', `attachment; filename="${file.originalFilename}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        // Stream file to response
        s3Stream.pipe(res);

        s3Stream.on('error', (error) => {
            console.error('S3 download error:', error);
            res.status(500).send('Error downloading file');
        });

    } catch (error) {
        console.error('Download error:', error);
        res.status(500).send('An error occurred during file download');
    }
};
