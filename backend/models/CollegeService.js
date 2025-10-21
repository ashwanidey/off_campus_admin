import mongoose from "mongoose";

/**
 * Schema for individual user submissions.
 * This will be nested as an array within each service document.
 */
const UserDetailSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: [true, "College name is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  numberOfStudents: {
    type: Number,
    required: [true, "Number of students is required"],
    min: [50, "Minimum 50 students required"],
  },
  collegeType: {
    type: String,
    required: [true, "College type is required"],
    enum: {
      values: ["government", "private"],
      message: "{VALUE} is not a supported college type.",
    },
  },
  sessionFormat: {
    type: String,
    required: [true, "Session format is required"],
    enum: {
      values: ["online", "offline"],
      message: "{VALUE} is not a supported session format.",
    },
  },

  collegeGraduation: {
    type: String,
    required: [true, "Education Level is required"],
  },

  quotedFigure: {
    type: Number,
    required: [true, "Quoted Figure is required"],
  },

  contacted_by_charchit: {
    type: Boolean,
    default: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const CollegeServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    college_serviceId: {
      type: Number,
      required: [true, "Service ID is required."],
      unique: true,
      min: [1, "Service ID must be between 1 and 4."],
      max: [4, "Service ID must be between 1 and 4."],
    },
    users: [UserDetailSchema], // An array of documents that follow the UserDetailSchema
    service_price_govt_per_student: {
      type: Number,
      required: [true, "Price for government colleges is required."],
      min: [0, "Price cannot be negative."],
    },
    service_price_pvt_per_student: {
      type: Number,
      required: [true, "Price for private colleges is required."],
      min: [0, "Price cannot be negative."],
    },
    service_price_govt_per_student_ug_online: {
      type: Number,
      required: [true, "Price for government colleges is required."],
      min: [0, "Price cannot be negative."],
    },
    service_price_govt_per_student_ug_offline: {
      type: Number,
      required: [true, "Price for government colleges is required."],
      min: [0, "Price cannot be negative."],
    },
    service_price_govt_per_student_pg_online: {
      type: Number,
      required: [true, "Price for government colleges is required."],
      min: [0, "Price cannot be negative."],
    },
    service_price_govt_per_student_pg_offline: {
      type: Number,
      required: [true, "Price for government colleges is required."],
      min: [0, "Price cannot be negative."],
    },

    service_price_pvt_per_student_ug_online: {
      type: Number,
      required: [true, "Price for government colleges is required."],
      min: [0, "Price cannot be negative."],
    },

    service_price_pvt_per_student_ug_offline: {
      type: Number,
      required: [true, "Price for government colleges is required."],
      min: [0, "Price cannot be negative."],
    },

    service_price_pvt_per_student_pg_offline: {
      type: Number,
      required: [true, "Price for government colleges is required."],
      min: [0, "Price cannot be negative."],
    },
    service_price_pvt_per_student_pg_online: {
      type: Number,
      required: [true, "Price for government colleges is required."],
      min: [0, "Price cannot be negative."],
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the model from the schema. Mongoose will create a MongoDB collection
// named 'collegeservices' (plural and lowercase).
export const CollegeService = mongoose.model(
  "CollegeService",
  CollegeServiceSchema
);

// module.exports = CollegeService;
