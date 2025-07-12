import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Card, CardContent } from "@mui/material";
import axios from "axios";
import { ethers } from "ethers";

const contractAddress = "0xBd2f808C32Ecfacd709FdD2cb00Ba8C8D7843095"; // Replace with your deployed contract address
const contractABI=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_patientId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_disease",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			}
		],
		"name": "addPatientData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			}
		],
		"name": "DoctorRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "medical",
				"type": "address"
			}
		],
		"name": "MedicalRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "patientId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "disease",
				"type": "string"
			}
		],
		"name": "PatientAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "patientId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "prescription",
				"type": "string"
			}
		],
		"name": "PrescriptionUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "registerAsDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registerAsMedical",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_patientId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_prescription",
				"type": "string"
			}
		],
		"name": "updatePrescription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_patientId",
				"type": "string"
			}
		],
		"name": "getPatientData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userRoles",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const WritePrescription = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const request = location.state?.request;
    // const id=request.patient_id;
    // console.log(id);

    const [prescription, setPrescription] = useState("");
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    const [privateKey, setPrivateKey] = useState("");

    useEffect(() => {
        promptForWalletDetails();

        if (request?.prescription) {
            setDownloadUrl(`https://gateway.pinata.cloud/ipfs/${request.prescription}`);
        }
    }, [request]);

    const promptForWalletDetails = () => {
        const address = window.prompt("Enter your wallet address:");
        const key = window.prompt("Enter your private key:");

        if (!address || !key) {
            alert("Wallet details are required!");
            navigate("/Doctor_Home");
            return;
        }

        setWalletAddress(address);
        setPrivateKey(key);
    };

    const registerDoctor = async () => {
        try {
            const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545"); // Use Ganache RPC
            const signer = new ethers.Wallet(privateKey, provider);
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const tx = await contract.registerAsDoctor();
            await tx.wait();
            console.log("Doctor registered successfully!");
        } catch (error) {
            console.error("Error registering doctor:", error);
            alert("Doctor registration failed.");
        }
    };

	const addPatientToBlockchain = async (request) => {
		try {
			console.log("Checking request object...");
			if (!request) {
				console.error("Error: request is undefined or null!");
				alert("Invalid patient data. Please check the input.");
				return;
			}
	
			console.log("Initializing provider...");
			const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
	
			console.log("Creating signer...");
			const signer = new ethers.Wallet(privateKey, provider);
	
			console.log("Connecting to contract...");
			const contract = new ethers.Contract(contractAddress, contractABI, signer);
	
			console.log("Request received:", request);
	
			// Extract data from request properly
			const name = request?.patientDetails?.name || request?.name;
			const age = request?.patientDetails?.age || request?.age;
			const gender = request?.patientDetails?.gender || request?.gender;
			const disease = request?.disease;
			const wallet_address = request?.wallet_address || request?.walletAddress;
			const pat_id = request?.patient_id;
			const doc_id = request?.doctor_id;
	
			console.log("Preparing transaction with parameters:");
			console.log("patient_id:", pat_id);
			console.log("name:", name);
			console.log("age:", age);
			console.log("gender:", gender);
			console.log("disease:", disease);
			console.log("walletAddress:", wallet_address);
	
			if (!pat_id || !name || !wallet_address) {
				console.error("Missing required data! Check input.");
				alert("Some required fields are missing. Please check again.");
				return false;
			}
	
			const tx = await contract.addPatientData(
				pat_id,
				name,
				age,
				gender,
				disease,
				wallet_address
			);
	
			console.log("Transaction sent! TX Hash:", tx.hash);
			// Wait for the transaction to be mined and log its receipt
			const receipt = await tx.wait();
			console.log("Transaction Receipt:", receipt);
			console.log("Patient successfully added to blockchain!");
			return true;
		} catch (error) {
			console.error("Error adding patient:", error);
			alert("Failed to add patient to blockchain. See console for details.");
			return false;
		}
	};
	
	const handleSavePrescription = async () => {
		try {
			console.log("Starting prescription save process...");
			console.log("Request before sending to blockchain:", request);
	
			// Step 1: Ensure request is properly structured
			if (!request || !request.patient_id || !request.doctor_id) {
				console.error("Invalid request structure:", request);
				alert("Invalid request. Please check the data.");
				return;
			}
	
			// Step 2: Add patient to blockchain first
			const patientAdded = await addPatientToBlockchain(request);
			if (!patientAdded) {
				console.error("Failed to add patient to blockchain.");
				return;
			}
	
			console.log("Patient added, now saving prescription to DB...");
	
			// Step 3: Save prescription to the database
			const response = await axios.post("http://localhost:3000/save-prescription", {
				patient_id: request.patient_id,
				doctor_id: request.doctor_id,		
				disease: request.disease,
				prescription: prescription,
				walletAddress: walletAddress, // Ensure correct variable usage
				privateKey
			});
	
			if (response.data.success) {
				alert("Prescription saved successfully!");
				setDownloadUrl(`https://gateway.pinata.cloud/ipfs/${response.data.ipfsHash}`);
				navigate("/Patient_Manage");
			} else {
				alert("Failed to save prescription.");
			}
		} catch (error) {
			console.error("Error saving prescription:", error);
			if (error.reason) console.error("Error Reason:", error.reason);
    		if (error.code) console.error("Error Code:", error.code);
    		if (error.transaction) console.error("Transaction Details:", error.transaction);
    		if (error.receipt) console.error("Transaction Receipt:", error.receipt);
			alert("Error saving prescription.");
		}
	};	

    return (
        <Container style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography variant="h3" gutterBottom>
                Write Prescription
            </Typography>

            <Button variant="contained" color="secondary" onClick={registerDoctor}>
                Register as Doctor
            </Button>

            <Card style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
                <CardContent>
                    <Typography variant="h6">Patient: {request.patientDetails.name}</Typography>
                    <Typography variant="body1">Age: {request.patientDetails.age}</Typography>
                    <Typography variant="body1">Gender: {request.patientDetails.gender}</Typography>
                    <Typography variant="body1">Disease: {request.disease}</Typography>
                    <TextField
                        label="Prescription"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                    />

                    <Button variant="contained" color="primary" onClick={handleSavePrescription}>
                        Save Prescription
                    </Button>

                    {downloadUrl && (
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginTop: "10px", marginLeft: "10px" }}
                            href={downloadUrl}
                            download={`prescription_${request.patient_id}.docx`}
                        >
                            Download Prescription
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default WritePrescription;
