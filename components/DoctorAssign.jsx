import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { 
    Paper, Typography, TextField, Button, CircularProgress, List, ListItem, ListItemText
} from "@mui/material";

function DoctorAssign() {
    const [disease, setDisease] = useState("");
    const [categories, setCategories] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [patientId, setPatientId] = useState(null);
    const [age, setAge] = useState(null);
    const [name, setName] = useState(null);
    const [gender, setGender] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    const [encryptedPrivateKey, setEncryptedPrivateKey] = useState("");

    useEffect(() => {
        promptForWalletDetails(); // Prompt user for wallet details on component load

        axios.get("http://localhost:3000/api/categories")
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));

        axios.get("http://localhost:3000/api/doctors")
            .then(response => setDoctors(response.data))
            .catch(error => console.error("Error fetching doctors:", error));

        axios.get("http://localhost:3000/user", { withCredentials: true })
        .then(response => {
            const userData = response.data.user;
            if (userData && userData.role === "2") {
                if (userData.patient_id) {
                    setPatientId(userData.patient_id);
                    setAge(userData.age);
                    setName(userData.name);
                    setGender(userData.gender);
                } else if (userData.email_id) {
                    fetchPatientId(userData.email_id);
                } else {
                    alert("User email not found. Please log in again.");
                }
            } else {
                alert("Access restricted. Please log in as a patient.");
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            alert("Error fetching user data. Please log in again.");
        });
    }, []);

    const promptForWalletDetails = () => {
        const address = window.prompt("Enter your wallet address:");
        const privateKey = window.prompt("Enter your private key:");

        if (!address || !privateKey) {
            alert("Wallet details are required!");
            return;
        }

        // Encrypt the private key
        const secretPassphrase = "mySecretKey"; // Change this to a secure passphrase
        const encryptedKey = CryptoJS.AES.encrypt(privateKey, secretPassphrase).toString();

        setWalletAddress(address);
        setEncryptedPrivateKey(encryptedKey);
    };

    const handleSearch = () => {
        setLoading(true);
        const diseaseEntry = categories.find(entry => 
            entry.Disease?.trim().toLowerCase() === disease.trim().toLowerCase()
        );

        if (!diseaseEntry) {
            alert("Disease not found.");
            setFilteredDoctors([]);
            setLoading(false);
            return;
        }

        const category1 = diseaseEntry.Category1?.trim().toLowerCase();
        const category2 = diseaseEntry.Category2?.trim().toLowerCase();

        const matchedDoctors = doctors.filter(doc => {
            const doctorCategory = doc.Category?.trim().toLowerCase();
            return doctorCategory && (doctorCategory === category1 || doctorCategory === category2);
        });

        setFilteredDoctors(matchedDoctors);
        setLoading(false);
    };

    const handleRequest = (doctorId) => {
        if (!patientId) {
            alert("Patient ID not found. Please log in again.");
            return;
        }

        if (!walletAddress || !encryptedPrivateKey) {
            alert("Wallet details are required. Please refresh and enter them again.");
            return;
        }

        axios.post("http://localhost:3000/request", {
            patient_id: patientId,
            doctor_id: doctorId,
            disease: disease,
            age: age,
            name: name,
            gender: gender,
            wallet_address: walletAddress,
            encrypted_private_key: encryptedPrivateKey
        }).then(response => {
            alert("Request sent successfully!");
        }).catch(error => {
            console.error("Error sending request:", error);
            alert("Failed to send request.");
        });
    };

    return (
        <Paper elevation={10} style={{ padding: "30px", width: "400px", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
                Doctor Assignment
            </Typography>

            <TextField
                label="Enter Disease"
                variant="outlined"
                fullWidth
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                style={{ marginBottom: "20px" }}
            />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearch}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Find Doctors"}
            </Button>

            {filteredDoctors.length > 0 && (
                <Paper elevation={5} style={{ marginTop: "20px", padding: "15px", maxHeight: "300px", overflowY: "auto" }}>
                    <Typography variant="h6" gutterBottom>
                        Available Doctors
                    </Typography>
                    <List style={{ maxHeight: "250px", overflowY: "auto" }}>
                        {filteredDoctors.map((doctor, index) => (
                            <ListItem key={index} divider>
                                <ListItemText 
                                    primary={doctor.Doctors} 
                                    secondary={`Specialty: ${doctor.Category}`} 
                                />
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => handleRequest(doctor.ID)}
                                >
                                    Request
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Paper>
    );
}

export default DoctorAssign;
