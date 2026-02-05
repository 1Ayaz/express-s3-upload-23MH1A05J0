const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../controllers/fileController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Configure Multer to use memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// All file routes require authentication
router.get('/upload', isAuthenticated, fileController.getUpload);
router.post('/upload', isAuthenticated, upload.single('file'), fileController.postUpload);

router.get('/files', isAuthenticated, fileController.getFiles);
router.get('/download/:id', isAuthenticated, fileController.downloadFile);

module.exports = router;
