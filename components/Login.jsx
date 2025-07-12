import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Link, Button, Paper, TextField, Typography } from "@mui/material";

function Login({ setIsLoggedIn,  setUserRole }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/login", { email, password }, { withCredentials: true })
            .then(result => {
                if (result.data === "Success") {
                    axios.get("http://localhost:3000/user", { withCredentials: true })
                        .then(response => {
                            console.log("User Data:", response.data);
                            if (response.data.user) {
                                const userData = response.data.user;
    
                                setIsLoggedIn(true);
                                setUserRole(userData.role); // Store role in state
    
                                // ✅ Save user data globally (for later use)
                                window.userData = userData;
    
                                 // ✅ Save patient_id and doctor_id in session storage
                                 if (userData.patient_id) {
                                    sessionStorage.setItem("patient_id", userData.patient_id);
                                }
                                if (userData.doctor_id) {
                                    sessionStorage.setItem("doctor_id", userData.doctor_id);
                                }

                                console.log("Saved User Data:", window.userData);
                                console.log("Patient ID:", userData.patient_id);
                                console.log("Doctor ID:", userData.doctor_id);
    
                                // Redirect based on role
                                if (userData.role == "1") {
                                    console.log("Navigating to Doctor Home");
                                    navigate("/Doc_Home");
                                } else if (userData.role == "2") {
                                    console.log("Navigating to Patient Home");
                                    navigate("/Pat_Home");
                                } else if (userData.role == "3") {
                                    console.log("Navigating to Medical Home");
                                    navigate("/med_Home");
                                } else {
                                    console.log("Unknown role:", userData.role);
                                }
                            }
                        })
                        .catch(err => console.error("Error fetching user data:", err));
                } else {
                    alert("Invalid credentials. Please try again.");
                }
            })
            .catch(err => console.error("Login error:", err));
    };

    const paperStyle = { padding: "2rem", margin: "100px auto", borderRadius: "1rem", boxShadow: "10px 10px 10px" };
    const heading = { fontSize: "2.5rem", fontWeight: "600" };
    const row = { display: "flex", marginTop: "2rem" };
    const btnStyle = { marginTop: "2rem", fontSize: "1.2rem", fontWeight: "700", backgroundColor: "blue", borderRadius: "0.5rem" };
    const label = { fontWeight: "700" };

    return (
        <div>
            <Grid align="center" className="wrapper">
                <Paper style={paperStyle} sx={{ width: { xs: '80vw', sm: '50vw', md: '40vw', lg: '30vw', xl: '20vw' }, height: { lg: '50vh' } }}>
                    <Typography component="h1" variant="h5" style={heading}>Login</Typography>
                    <form onSubmit={handleLogin}>
                        <span style={row}>
                            <TextField sx={{ label: { fontWeight: '700', fontSize: "1.3rem" } }} label="Email" fullWidth variant="outlined" type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                        </span>
                        <span style={row}>
                            <TextField sx={{ label: { fontWeight: '700', fontSize: "1.3rem" } }} label="Password" fullWidth variant="outlined" type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                        </span>
                        <Button style={btnStyle} variant="contained" type="submit">Login</Button>
                    </form>
                    <p>Don't have an account? <Link href="/signup">SignUp</Link></p>
                </Paper>
            </Grid>
        </div>
    );
}

export default Login;
