// import mongoose from "mongoose";
// const { Schema } = mongoose;
// const studentSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   avatar: {
//     type: String,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   year: {
//     type: Number,
//     required: true,
//   },
//   subjects: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "subject",
//     },
//   ],
//   username: {
//     type: String,
//   },
//   gender: {
//     type: String,
//   },
//   fatherName: {
//     type: String,
//   },
//   motherName: {
//     type: String,
//   },
//   department: {
//     type: String,
//     required: true,
//   },
//   section: {
//     type: String,
//     required: true,
//   },
//   batch: {
//     type: String,
//   },
//   contactNumber: {
//     type: Number,
//   },
//   fatherContactNumber: {
//     type: Number,
//   },
//   dob: {
//     type: String,
//     required: true,
//   },
//   passwordUpdated: {
//     type: Boolean,
//     default: false,
//   },
// });

// export default mongoose.model("student", studentSchema);


import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  studentId: {
    type: String,
    unique: true,
    // This will auto-generate a studentId if none is provided
    default: function() {
      // Generate a unique ID in format STU + YYYY (current year) + random 5-digit number
      const currentYear = new Date().getFullYear();
      return "STU" + currentYear + Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    }
  },
  rollNumber: {
    type: String,
    unique: true,
    // Auto-generate a roll number based on department, year, and a random number
    default: function() {
      // This is a basic implementation - you might want to customize the format
      // Current format: Department initials + Year + Random 3-digit number
      const deptCode = this.department ? this.department.substring(0, 3).toUpperCase() : "STD";
      const yearCode = this.year || new Date().getFullYear().toString().slice(-2);
      const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      
      return `${deptCode}${yearCode}${randomDigits}`;
    }
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "subject",
    },
  ],
  username: {
    type: String,
  },
  gender: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  fatherContactNumber: {
    type: Number,
  },
  motherContactNumber: {
    type: Number,
  },
  dob: {
    type: String,
    required: true,
  },
  passwordUpdated: {
    type: Boolean,
    default: false,
  },
}, { 
  timestamps: true 
});

// Create indexes for unique fields
studentSchema.index({ studentId: 1 }, { unique: true });
studentSchema.index({ email: 1 }, { unique: true });
studentSchema.index({ rollNumber: 1 }, { unique: true });

// Create a pre-save middleware to ensure the roll number is generated properly
// This is especially important since the default function might not have access to department and year
// at the exact moment it's called
studentSchema.pre('save', function(next) {
  // Only generate rollNumber if it doesn't exist
  if (!this.rollNumber || this.rollNumber === "null") {
    const deptCode = this.department ? this.department.substring(0, 3).toUpperCase() : "STD";
    const yearCode = this.year || new Date().getFullYear().toString().slice(-2);
    const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    this.rollNumber = `${deptCode}${yearCode}${randomDigits}`;
  }
  next();
});

export default mongoose.model("student", studentSchema);