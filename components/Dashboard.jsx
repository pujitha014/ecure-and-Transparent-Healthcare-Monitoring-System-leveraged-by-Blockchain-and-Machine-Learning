import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Use useNavigate for React Router v6

const Dashboard = () => {
    const [patientId, setPatientId] = useState("");
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook to handle navigation

    const fetchPatientData = async () => {
        if (!patientId) {
            alert("Please enter a Patient ID.");
            return;
        }

        // Prompt user for wallet details
        const walletAddress = prompt("Enter your Wallet Address:");
        if (!walletAddress) {
            alert("Wallet address is required!");
            return;
        }

        const privateKey = prompt("Enter your Private Key:");
        if (!privateKey) {
            alert("Private key is required!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/fetchPatientData", {
                patient_id: patientId,
                wallet_address: walletAddress,
                private_key: privateKey,
            });

            setPatientData(response.data);
            console.log("Fetched patient data:", response.data); // Log to check the structure
        } catch (error) {
            console.error("Error fetching patient data:", error);
            setError("Failed to retrieve patient data.");
        }
        
        setLoading(false);
    };

    // Navigate to IPFS page with the prescription IPFS hash
    const handleSeePrescription = (ipfsHash) => {
        navigate(`/ipfs?hash=${ipfsHash}`); // Use navigate instead of history.push
    };

    return (
        <Container style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography variant="h3" gutterBottom>
                Patient Dashboard
            </Typography>

            <Card style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
                <CardContent>
                    <TextField
                        label="Enter Patient ID"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                    />

                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        onClick={fetchPatientData}
                        disabled={loading}
                    >
                        {loading ? "Fetching..." : "Get Patient Data"}
                    </Button>

                    {error && <Typography color="error">{error}</Typography>}

                    {patientData && (
                        <Card style={{ marginTop: "20px", padding: "15px" }}>
                            <Typography variant="h6">Patient Details</Typography>
                            <Typography variant="body1"><strong>Name:</strong> {patientData.name}</Typography>
                            <Typography variant="body1"><strong>Age:</strong> {patientData.age}</Typography>
                            <Typography variant="body1"><strong>Gender:</strong> {patientData.gender}</Typography>
                            <Typography variant="body1"><strong>Disease:</strong> {patientData.disease}</Typography>
                            <Typography variant="body1"><strong>Prescription:</strong> {patientData.prescription}</Typography>

                            {/* Add a check to ensure prescription exists */}
                            {patientData.prescription && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleSeePrescription(patientData.prescription)}
                                    style={{ marginTop: "10px" }}
                                >
                                    See Prescription
                                </Button>
                            )}
                        </Card>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default Dashboard;
