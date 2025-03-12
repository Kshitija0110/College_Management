
import mongoose from "mongoose";

const facultySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  facultyId: {
    type: String,
    unique: true,
    // This will auto-generate a facultyId if none is provided
    default: function() {
      // Generate a unique ID using the current timestamp and a random number
      return "FAC" + Math.floor(Math.random() * 10000).toString().padStart(4, '0') + 
             Date.now().toString().slice(-4);
    }
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
  gender: {
    type: String,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
  },
  dob: {
    type: String,
    required: true,
  },
  joiningYear: {
    type: Number,
    required: true,
  },
  passwordUpdated: {
    type: Boolean,
    default: false,
  },
});

// Create an index for the facultyId to ensure uniqueness
facultySchema.index({ facultyId: 1 }, { unique: true });

export default mongoose.model("faculty", facultySchema);