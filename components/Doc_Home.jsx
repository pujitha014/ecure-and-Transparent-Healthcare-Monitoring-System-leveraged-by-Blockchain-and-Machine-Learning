import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function DocHome() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(location.state?.user);
    const [loading, setLoading] = useState(!user);
    const [walletAddress, setWalletAddress] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    // Load wallet details from localStorage if they exist
    useEffect(() => {
        const savedWallet = localStorage.getItem("walletAddress");
        const savedPrivateKey = localStorage.getItem("privateKey");

        if (savedWallet && savedPrivateKey) {
            setWalletAddress(savedWallet);
            setPrivateKey(savedPrivateKey);
        } else {
            setShowPopup(true);  // Show popup if no wallet details are saved
        }
    }, []);

    useEffect(() => {
        if (!user) {
            axios.get("http://localhost:3000/user", { withCredentials: true })
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

    const handleSaveWallet = () => {
        if (!walletAddress || !privateKey) {
            alert("Please enter both Wallet Address and Private Key.");
            return;
        }

        localStorage.setItem("walletAddress", walletAddress);
        localStorage.setItem("privateKey", privateKey);

        console.log("Doctor's Wallet Address:", walletAddress);
        console.log("Doctor's Private Key:", privateKey);

        alert("Wallet details saved successfully!");
        setShowPopup(false);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1 style={{ color: "white", fontSize: "3rem" }}>Welcome, Doctor!</h1>

            {showPopup && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                        <h2>Enter Your Wallet Address and Private Key</h2>
                        <input
                            type="text"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            placeholder="Enter wallet address"
                            style={{ padding: "10px", width: "80%" }}
                        />
                        <br /><br />
                        <input
                            type="password"
                            value={privateKey}
                            onChange={(e) => setPrivateKey(e.target.value)}
                            placeholder="Enter private key"
                            style={{ padding: "10px", width: "80%" }}
                        />
                        <br /><br />
                        <button onClick={handleSaveWallet} style={{ padding: "10px 20px", cursor: "pointer" }}>Save</button>
                    </div>
                </div>
            )}

            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
                marginTop: "20px"
            }}>
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
                    onClick={() => navigate("/Patient_Manage")}
                >
                    <h2>Manage Patients & Prescriptions</h2>
                    <p>Click to manage patient records and prescriptions</p>
                </div>

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
                    onClick={() => navigate("/Dashboard")}
                >
                    <h2>Data</h2>
                    <p>Click to manage patient records and prescriptions</p>
                </div>
            </div>
        </div>
    );
}

export default DocHome;
