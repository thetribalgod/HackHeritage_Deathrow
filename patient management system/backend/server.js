// import app from "./app.js";
// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server listening at port ${process.env.PORT}`);
// });
import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set default port
const PORT = process.env.PORT || 4000; // Use 4000 as default if PORT is not defined

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
