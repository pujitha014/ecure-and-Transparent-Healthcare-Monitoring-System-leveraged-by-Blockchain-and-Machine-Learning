import React, { useState, useEffect } from "react";
import { Container, Typography, Card } from "@mui/material";
import { useLocation } from "react-router-dom";

const IPFS = () => {
    const [fileUrl, setFileUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const ipfsHash = searchParams.get("hash"); // Get the IPFS hash from the query parameters

        if (ipfsHash) {
            fetchFileFromIPFS(ipfsHash);
        }
    }, [location]);

    const fetchFileFromIPFS = async (ipfsHash) => {
        setLoading(true);
        setError(null);

        try {
            // Construct the IPFS URL using a public gateway (e.g., Pinata or ipfs.io)
            const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
            
            // Set the file URL for embedding in Google Docs Viewer
            setFileUrl(ipfsUrl);
        } catch (error) {
            console.error("Error fetching file from IPFS:", error);
            setError("Failed to fetch the file from IPFS.");
        }

        setLoading(false);
    };

    return (
        <Container style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography variant="h3" gutterBottom>
                View Prescription from IPFS
            </Typography>

            {loading && <Typography variant="h6">Loading...</Typography>}

            {error && <Typography color="error">{error}</Typography>}

            {fileUrl && (
                <Card style={{ marginTop: "20px", padding: "15px" }}>
                    <Typography variant="h6">Prescription Document</Typography>
                    
                    {/* Use Google Docs Viewer to display the document */}
                    <iframe
                        src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
                        style={{
                            width: "100%",
                            height: "500px",
                            border: "1px solid #ddd",
                            marginTop: "20px",
                        }}
                        title="Prescription Document"
                    />
                </Card>
            )}
        </Container>
    );
};

export default IPFS;
