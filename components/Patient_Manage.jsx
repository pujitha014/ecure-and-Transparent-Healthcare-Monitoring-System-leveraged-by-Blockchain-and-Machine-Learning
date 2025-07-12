import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Patient_Manage = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doctorId, setDoctorId] = useState("");

    useEffect(() => {
        // Fetch doctor ID from session storage
        const storedDoctorId = sessionStorage.getItem("doctor_id");
        if (storedDoctorId) {
            setDoctorId(storedDoctorId);
            fetchRequests(storedDoctorId);
        } else {
            console.error("Doctor ID not found in session storage.");
            setLoading(false);
        }
    }, []);

    const fetchRequests = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:3000/doctor/notifications/${doctorId}`);

            console.log("Response data:", response.data); // Log the response data
            if (response.data && response.data.length > 0) {
                setRequests(response.data);
            } else {
                console.log("No patient requests found.");
            }
        } catch (error) {
            console.error("Error fetching patient requests:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleWritePrescription = (request) => {
        navigate("/WritePrescription", { state: { request } });
    };


    return (
        <Container style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography variant="h3" gutterBottom>
                Patient Requests 
            </Typography>

            {loading ? (
                <CircularProgress style={{ marginTop: "20px" }} />
            ) : requests.length === 0 ? (
                <Typography variant="body1" color="textSecondary" style={{ marginTop: "20px" }}>
                    No pending requests.
                </Typography>
            ) : (
                requests.map((request) => (
                    <Card key={request._id} style={{ margin: "20px 0", padding: "10px" }}>
                        <CardContent>
                            <Typography variant="h6">Patient: {request.patientDetails.name}</Typography>
                            <Typography variant="body1">Age: {request.patientDetails.age}</Typography>
                            <Typography variant="body1">Gender: {request.patientDetails.gender}</Typography>
                            <Typography variant="body1">Disease: {request.disease}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Status: {request.status}
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                style={{ marginTop: "10px" }} 
                                onClick={() =>handleWritePrescription(request)}
                            >
                                Write Prescription
                            </Button>
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default Patient_Manage;
