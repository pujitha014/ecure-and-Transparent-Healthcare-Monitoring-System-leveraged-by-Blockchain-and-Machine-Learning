import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, TextField, Typography, Button, MenuItem, Select, FormControl, InputLabel, Link } from "@mui/material";

function SignUp() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");  // Added Age
    const [gender, setGender] = useState("");  // Added Gender
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); 
    const [id, setId] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Function to generate a unique Patient ID
    const generatePatientId = () => {
        return `PAT-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const userData = { name, age, gender, email, password, role }; // Included Age & Gender

        if (role === "2") {
            userData.patient_id = generatePatientId();
        } else if (role === "1" || role === "3") {
            userData.id = id; // Assign ID for doctors & medical staff
        }

        try {
            await axios.post("http://localhost:3000/signup", userData);
            alert("Signup successful! Please log in.");
            navigate("/login");
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrorMessage(err.response.data.message);
            } else {
                console.error(err);
            }
        }
    };

    const paperStyle = { padding: "2rem", margin: "100px auto", borderRadius: "1rem", boxShadow: "10px 10px 10px" };
    const row = { display: "flex", marginTop: "2rem" };
    const btnStyle = { marginTop: "2rem", fontSize: "1.2rem", fontWeight: "700", backgroundColor: "blue", borderRadius: "0.5rem" };

    return (
        <Grid align="center" className="wrapper">
            <Paper style={paperStyle} sx={{ width: { xs: '80vw', sm: '50vw', md: '40vw', lg: '30vw', xl: '20vw' }, height: { lg: '85vh' } }}>
                <Typography component="h1" variant="h5" style={{ fontSize: "2.5rem", fontWeight: "600" }}>Signup</Typography>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <form onSubmit={handleSignup}>
                    <TextField style={row} fullWidth label="Enter Name" onChange={(e) => setName(e.target.value)} required />
                    <TextField style={row} fullWidth label="Age" type="number" onChange={(e) => setAge(e.target.value)} required />  {/* Added Age Field */}
                    
                    {/* Gender Selection Dropdown */}
                    <FormControl fullWidth style={row}>
                        <InputLabel>Gender</InputLabel>
                        <Select value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField style={row} fullWidth label="Email" type="email" onChange={(e) => setEmail(e.target.value)} required />
                    <TextField style={row} fullWidth label="Password" type="password" onChange={(e) => setPassword(e.target.value)} required />

                    {/* Role Selection Dropdown */}
                    <FormControl fullWidth style={row}>
                        <InputLabel>Select Role</InputLabel>
                        <Select value={role} onChange={(e) => setRole(e.target.value)} required>
                            <MenuItem value="1">Doctor</MenuItem>
                            <MenuItem value="2">Patient</MenuItem>
                            <MenuItem value="3">Medical</MenuItem>
                        </Select>
                    </FormControl>

                    {/* ID Field for Doctors & Medical Staff */}
                    {(role === "1" || role === "3") && (
                        <TextField style={row} fullWidth label="Verification ID" placeholder="Enter your certification/license ID" onChange={(e) => setId(e.target.value)} required />
                    )}

                    <Button style={btnStyle} variant="contained" type="submit">Sign Up</Button>
                </form>
                <p>Already have an account? <Link href="/login">Login</Link></p>
            </Paper>
        </Grid>
    );
}

export default SignUp;
