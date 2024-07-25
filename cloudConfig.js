// Import Cloudinary library and CloudinaryStorage class from multer-storage-cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary with environment variables for authentication
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Cloudinary cloud name
  api_key: process.env.CLOUD_API_KEY, // Cloudinary API key
  api_secret: process.env.CLOUD_API_SECRET, // Cloudinary API secret
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Use the configured Cloudinary instance
  params: {
    folder: "wanderlust_DEV", // Folder name in Cloudinary to store the files
    allowedFormats: ["png", "jpeg", "jpg"], // Allowed file formats for upload
  },
});

// Export the configured Cloudinary and storage objects
module.exports = {
  cloudinary,
  storage,
};
