# Express S3 File Upload Application - 23MH1A05J0

A minimal Express.js web application for file upload and download using AWS S3, with MongoDB for data storage and session-based authentication.

## Features

- **User Authentication**: Simple login system using express-session
- **File Upload**: Upload files to AWS S3 using Multer
- **File Download**: Download files from AWS S3
- **MongoDB Integration**: Store user credentials and file metadata
- **Session Management**: Maintain user login state
- **AWS S3 Storage**: Secure file storage in AWS S3

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: bcryptjs + express-session
- **File Upload**: Multer (memory storage)
- **Cloud Storage**: AWS S3 (AWS SDK)
- **Template Engine**: Pug
- **Environment Variables**: dotenv

## Project Structure

```
express-s3-upload-23MH1A05J0/
├── app.js                      # Express app configuration
├── server.js                   # Server entry point
├── models/
│   ├── User.js                 # User model with bcrypt
│   └── File.js                 # File metadata model
├── controllers/
│   ├── authController.js       # Authentication logic
│   └── fileController.js       # File upload/download logic
├── routes/
│   ├── authRoutes.js           # Authentication routes
│   └── fileRoutes.js           # File operation routes
├── middleware/
│   └── authMiddleware.js       # Session verification
├── views/
│   ├── login.pug               # Login page
│   ├── upload.pug              # File upload page
│   └── files.pug               # File list page
├── .env.example                # Environment variables template
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- AWS Account with:
  - S3 bucket created
  - IAM user with S3 access permissions
  - Access Key ID and Secret Access Key

## Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your actual values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/fileupload
   SESSION_SECRET=your-random-secret-key
   AWS_ACCESS_KEY_ID=your-aws-access-key-id
   AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=your-bucket-name
   PORT=3000
   ```

4. **Create a test user in MongoDB**
   
   Start MongoDB and run:
   ```javascript
   use fileupload
   db.users.insertOne({
     username: "admin",
     password: "$2a$10$YourHashedPasswordHere",
     createdAt: new Date()
   })
   ```
   
   Or use the application to register (you'll need to add a registration route temporarily).

## Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start the application**
   ```bash
   node server.js
   ```
   
   Or use nodemon for development:
   ```bash
   npm install -g nodemon
   nodemon server.js
   ```

3. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. **Login**: Use your credentials to log in
2. **Upload File**: Navigate to the upload page and select a file
3. **View Files**: See all your uploaded files
4. **Download File**: Click the download button to retrieve files from S3

## Routes

- `GET /` - Redirects to login or upload based on authentication
- `GET /login` - Login page
- `POST /login` - Handle login
- `GET /logout` - Logout and destroy session
- `GET /upload` - File upload page (authenticated)
- `POST /upload` - Handle file upload to S3 (authenticated)
- `GET /files` - List all uploaded files (authenticated)
- `GET /download/:id` - Download file from S3 (authenticated)

## AWS S3 Configuration

### IAM User Permissions

Your IAM user needs the following S3 permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
  ]
}
```

### S3 Bucket Configuration

- Bucket should NOT be public
- Block all public access (recommended)
- Access is controlled via IAM credentials

## Deployment to AWS EC2

1. **Connect to EC2 instance**
   ```bash
   ssh -i your-key.pem ec2-user@your-ec2-ip
   ```

2. **Install Node.js and MongoDB**
   ```bash
   curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
   sudo yum install -y nodejs
   sudo yum install -y mongodb-org
   ```

3. **Upload project files**
   ```bash
   scp -i your-key.pem -r express-s3-upload-23MH1A05J0 ec2-user@your-ec2-ip:~
   ```

4. **Install dependencies and configure**
   ```bash
   cd express-s3-upload-23MH1A05J0
   npm install
   nano .env  # Add your environment variables
   ```

5. **Start the application**
   ```bash
   node server.js
   ```
   
   Or use PM2 for production:
   ```bash
   npm install -g pm2
   pm2 start server.js --name file-upload-app
   pm2 save
   pm2 startup
   ```

6. **Configure security group**
   - Allow inbound traffic on port 3000 (or your chosen port)
   - Allow SSH (port 22) for management

## Security Considerations

- Passwords are hashed using bcryptjs
- Session secret should be a strong random string
- AWS credentials are stored in environment variables
- S3 bucket is not publicly accessible
- File size limit is set to 10MB (configurable in fileRoutes.js)

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify network connectivity

### AWS S3 Upload Error
- Verify AWS credentials are correct
- Check IAM user has proper S3 permissions
- Ensure bucket name is correct and exists
- Verify AWS region matches your bucket

### Session Not Persisting
- Check SESSION_SECRET is set in .env
- Ensure cookies are enabled in browser
- Verify session middleware is configured correctly

## License

ISC

## Author

Student ID: 23MH1A05J0
