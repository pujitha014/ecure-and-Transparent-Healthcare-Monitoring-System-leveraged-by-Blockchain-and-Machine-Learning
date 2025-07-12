import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function HomeButton() {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/"); // Adjust the path if your home route is different
    };

    const buttonStyle = {
        marginRight: "20px",
        fontSize: "1.2rem",
        fontWeight: "700",
        padding: "0.3rem 1.4rem",
    };

    return (
        <Button variant="contained" color="primary" style={buttonStyle} onClick={handleHome}>
            Home
        </Button>
    );
}

export default HomeButton;
