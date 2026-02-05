# Quick Setup Guide

This guide will help you get the application running quickly.

## Step 1: Environment Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your actual values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/fileupload
   SESSION_SECRET=my-super-secret-session-key-12345
   AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
   AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=my-file-upload-bucket
   PORT=3000
   ```

## Step 2: Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
mongod
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
```

## Step 3: Create Test User

Run the helper script to create a test user:

```bash
node createUser.js
```

This will create:
- **Username:** admin
- **Password:** admin123

## Step 4: Start the Application

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

## Step 5: Access the Application

Open your browser and go to:
```
http://localhost:3000
```

Login with:
- **Username:** admin
- **Password:** admin123

## Testing the Application

1. **Login** - Use the credentials above
2. **Upload a file** - Select any file and upload
3. **View files** - See your uploaded files list
4. **Download** - Click download to retrieve files from S3

## Troubleshooting

### MongoDB not connecting
- Ensure MongoDB is running
- Check if the MONGODB_URI is correct
- Try: `mongodb://127.0.0.1:27017/fileupload`

### AWS S3 errors
- Verify your AWS credentials
- Check bucket name and region
- Ensure IAM user has S3 permissions

### Port already in use
- Change PORT in .env to another port (e.g., 3001)
- Or stop the process using port 3000

## AWS S3 Setup

If you haven't set up AWS S3 yet:

1. **Create S3 Bucket:**
   - Go to AWS Console → S3
   - Click "Create bucket"
   - Choose a unique name
   - Keep "Block all public access" enabled
   - Create bucket

2. **Create IAM User:**
   - Go to AWS Console → IAM
   - Create new user
   - Attach policy: AmazonS3FullAccess (or custom policy)
   - Generate Access Key
   - Copy Access Key ID and Secret Access Key

3. **Update .env:**
   - Add your Access Key ID
   - Add your Secret Access Key
   - Add your bucket name
   - Add your region (e.g., us-east-1)

## Next Steps

- Customize the UI in the views folder
- Add more features as needed
- Deploy to AWS EC2 (see README.md)
