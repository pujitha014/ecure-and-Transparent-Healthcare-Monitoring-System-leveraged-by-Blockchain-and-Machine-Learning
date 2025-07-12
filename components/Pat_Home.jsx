import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function PatHome() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(location.state?.user);
    const [loading, setLoading] = useState(!user);

    useEffect(() => {   
        if (!user) {
            axios.get('http://localhost:3000/user', { withCredentials: true })
                .then(response => {
                    if (response.data.user) {
                        setUser(response.data.user);
                    } else {
                        navigate("/login");
                    }
                })
                .catch(() => navigate("/login"))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user, navigate]);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1 style={{ color: "white", fontSize: "3rem" }}>Welcome Home</h1>

            {/* Container for Features (Side by Side) */}
            <div 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginTop: "20px"
                }}
            >
                {/* Disease Prediction Feature */}
                <div 
                    style={{
                        backgroundColor: "#fffcfc",
                        color: "black",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "40%",
                        minWidth: "300px",
                        boxShadow: "0 10px 20px rgb(0, 0, 0)",
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/prediction")}
                >
                    <h2>Disease Prediction Feature</h2>
                    <p>Click to start predicting diseases</p>
                </div>

                {/* Doctor Assign Feature */}
                <div 
                    style={{
                        backgroundColor: "#fffcfc",
                        color: "black",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "40%",
                        minWidth: "300px",
                        boxShadow: "0 10px 20px rgb(0, 0, 0)",
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/DoctorAssign")}
                >
                    <h2>Doctor Assign Feature</h2>
                    <p>Click to view doctors and their specialties</p>
                </div>

                {/* Prescription Generator Feature */}
                <div 
                    style={{
                        backgroundColor: "#fffcfc",
                        color: "black",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "40%",
                        minWidth: "300px",
                        boxShadow: "0 10px 20px rgb(0, 0, 0)",
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/prescription")}
                >
                    <h2>Prescription Generator</h2>
                    <p>Click to generate prescriptions based on diseases</p>
                </div>
            </div>
        </div>
    );
}

export default PatHome;
