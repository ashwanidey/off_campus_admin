import { JobOpenings } from "../models/JobOpenings.js";
import AWS from 'aws-sdk';
import multer from "multer";
import dotenv from "dotenv";
import { Expert } from "../models/Experts.js";
dotenv.config();

export const createJobOpening = async (req, res) => {
  try {
    const { role, image, link, company } = req.body;

    if (!role || !company || !link) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newJobOpening = new JobOpenings({
      role,
      image,
      link,
      company,
    });

    await newJobOpening.save();

    return res.status(201).json({ message: "Job opening created successfully." });
  } catch (error) {
    console.error("Error creating job opening:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}


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
      return cb(new Error("Invalid file type. Only JPEG and PNG images are allowed."));
    }
    cb(null, true);
  },
});

export const uploadCompanyImage = async (req, res) => {
  const uploadSingle = upload.single("file");
  

  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const file = req.file;
    const companyName = req.body.company;
    if (!companyName) {
      return res.status(400).json({ message: "Company name is required" });
    }
   
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

   

    try {
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `company_images/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      s3.upload(uploadParams, (err, data) => {
        if (err) {
          return res.status(500).json({ message: "Error uploading to S3", error: err });
        }
        return res.status(200).json({ message: "File uploaded successfully", url: data.Location });
      });

       const expert = await Expert.findOne({ id:101 });
      expert.job_openings.push({
        company_name: companyName,
        file_name: file.originalname,
      });
      await expert.save();

      
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  });
};