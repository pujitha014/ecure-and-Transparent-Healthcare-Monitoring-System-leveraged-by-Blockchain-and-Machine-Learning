import {React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Pat_Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { Navbar } from "./components/Navbar";
import Prediction from "./components/prediction"; 
import DoctorAssign from "./components/DoctorAssign";
import PrescriptionGenerator from "./components/Prescription";
import Doc_Home from "./components/Doc_Home";
import Med_Home from "./components/Med_Home"; // Import Medical Home
import Patient_Manage from "./components/Patient_Manage";
import WritePrescription from "./components/WritePrescription";
import Dashboard from "./components/Dashboard";
import axios from "axios";
import  IPFS from "./components/IPFS";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);  // Track user role

  useEffect(() => {
      axios.get('http://localhost:3000/user', { withCredentials: true })
          .then(response => {
              if (response.data.user) {
                  setIsLoggedIn(true);
                  setUserRole(response.data.user.role); // Store user role
              } else {
                  setIsLoggedIn(false);
                  setUserRole(null);
              }
          })
          .catch(() => {
              setIsLoggedIn(false);
              setUserRole(null);
          });
  }, []);

  return (
      <div>
          <BrowserRouter>
              <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <Routes>
                  <Route path="/Pat_Home" element={<Home />} />
                  <Route path="/Doc_Home" element={<Doc_Home />} />
                  <Route path="/med_Home" element={<Med_Home />} />

                  {/* Redirect login/signup based on role */}
                  <Route 
                      path="/login" 
                      element={
                          isLoggedIn ? (
                              userRole == "1" ? <Navigate to="/Doc_Home" /> : 
                              userRole == "2" ? <Navigate to="/Pat_Home" /> :
                              userRole == "3" ? <Navigate to="/Med_Home" /> :
                              <Navigate to="/Pat_Home" />
                          ) : <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
                      } 
                  />
                  <Route 
                      path="/signup" 
                      element={
                          isLoggedIn ? (
                              userRole == "1" ? <Navigate to="/Doc_Home" /> : 
                              userRole == "2" ? <Navigate to="/Pat_Home" /> :
                              userRole == "3" ? <Navigate to="/med_Home" /> :
                              <Navigate to="/Pat_Home" />
                          ) : <SignUp setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
                      } 
                  />
                  
                  <Route path="/" element={isLoggedIn ? <Navigate to={userRole == "1" ? "/Doc_Home" : userRole == "2" ? "/Pat_Home" : "/med_Home"} /> : <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
                  <Route path="/prediction" element={<Prediction />} />
                  <Route path="/DoctorAssign" element={<DoctorAssign />} />
                  <Route path="/Prescription" element={<PrescriptionGenerator />} />
                  <Route path="/Patient_Manage" element={<Patient_Manage />} />
                  <Route path="/WritePrescription" element={<WritePrescription/>}/>
                  <Route path="/Dashboard" element={<Dashboard/>}/>
                  <Route path="/ipfs" element={<IPFS/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
