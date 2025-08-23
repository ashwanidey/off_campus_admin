import { SuccessStories } from "../models/successStories.js";
import AWS from "aws-sdk";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file type. Only JPEG and PNG images are allowed.")
      );
    }
    cb(null, true);
  },
});

export const createTestimonial = async (req, res) => {
  try {
    const uploadSingle = upload.single("file");
    uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const file = req.file;
      const { name, company, companyLogo, id } = req.body;
      // console.log("file: ", req.file);
      // console.log("body: ", req.body);

      try {
        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `success_story/${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        s3.upload(uploadParams, async (err, data) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error uploading to S3", error: err });
          }

          try {
            console.log("File uploaded to S3:", file.originalname);
            const successstories = new SuccessStories({
              name,
              company,
              companyLogo,
              photo: file.originalname,
              id,
            });

            await successstories.save();

            return res.status(200).json({
              message: "File uploaded successfully",
              url: data.Location,
            });
          } catch (dbErr) {
            console.error("Database error:", dbErr);
            return res.status(500).json({
              message: "File uploaded but failed to update database",
              error: dbErr,
            });
          }
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Internal server error", error });
      }
    });
  } catch (error) {
    console.error("Error in createTestimonial:", error);
    return res.status(500).json({ message: "Internal server error: ", error });
  }
};
