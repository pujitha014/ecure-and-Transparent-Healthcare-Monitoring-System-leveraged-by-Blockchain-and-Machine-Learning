const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }, // 1 = Doctor, 2 = Patient, 3 = Medical
    id: { type: String, sparse: true }, // For doctors and medical staff
    patient_id: { type: String, sparse: true }, // Only for patients
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
