import React, { useState } from "react";
import axios from "axios";
import { Paper, Typography, TextField, Button, CircularProgress, List, ListItem, ListItemText } from "@mui/material";

function PrescriptionGenerator() {
    const [disease, setDisease] = useState("");
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!disease.trim()) {
            alert("Please enter a disease");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`http://localhost:3000/api/prescription/${disease}`);
            setPrescriptions(response.data);
        } catch (err) {
            setError("No prescription found for this disease.");
            setPrescriptions([]);
        }

        setLoading(false);
    };

    return (
            <Paper elevation={10} style={{ padding: "30px", width: "600px", textAlign: "center", boxShadow: "0 10px 20px rgb(0, 0, 0)" }}>
                <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
                    Prescription Generator
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
                    {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Find Prescription"}
                </Button>

                {error && <Typography color="error" style={{ marginTop: "10px" }}>{error}</Typography>}

                {prescriptions.length > 0 && (
                    <Paper elevation={5} style={{ marginTop: "20px", padding: "15px", maxHeight: "350px", overflowY: "auto" }}>
                        <Typography variant="h6" gutterBottom>
                            Medicines
                        </Typography>
                        <List>
                            {prescriptions.map((prescription, index) => (
                                <ListItem key={index} style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <ListItemText
                                        primary={<strong>Medicine: {prescription.Medicine}</strong>}
                                        secondary={
                                            <>
                                                <Typography variant="body2" style={{ marginTop: "5px", whiteSpace: "pre-line" }}>
                                                    <strong>Dosing:</strong> {prescription.Dosing}
                                                </Typography>
                                                <Typography variant="body2" style={{ marginTop: "5px", whiteSpace: "pre-line" }}>
                                                    <strong>Precautions:</strong> {prescription.Precautions}
                                                </Typography>
                                                <Typography variant="body2" style={{ marginTop: "5px", whiteSpace: "pre-line" }}>
                                                    <strong>Side Effects:</strong> {prescription["Side Effects"]}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
            </Paper>
    );
}

export default PrescriptionGenerator;
