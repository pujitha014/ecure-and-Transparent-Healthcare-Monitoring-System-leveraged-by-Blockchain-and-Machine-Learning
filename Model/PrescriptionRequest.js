const mongoose = require("mongoose");

const prescriptionRequestSchema = new mongoose.Schema({
    patient_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    disease: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    prescription: { type: Buffer }, // Store prescription as Binary Data
    patientDetails: {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true }
    },
    wallet_address: { type: String, required: true },
    encrypted_private_key: { type: String, required: true }
}, { timestamps: true });

const PrescriptionRequest = mongoose.model("PrescriptionRequest", prescriptionRequestSchema);
module.exports = PrescriptionRequest;
