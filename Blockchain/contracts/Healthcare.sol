// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Healthcare {
    address public admin;

    enum Role { NONE, DOCTOR, PATIENT, MEDICAL }

    struct Patient {
        string name;
        uint age;
        string gender;
        string disease;
        string prescription;
        bool exists;
    }

    mapping(address => uint) public userRoles; // 1 = Doctor, 2 = Patient, 3 = Medical
    mapping(string => Patient) private patients; // Store patient data

    event DoctorRegistered(address doctor);
    event PatientAdded(string patientId, string name, uint age, string gender, string disease);
    event PrescriptionUpdated(string patientId, string prescription);
    event MedicalRegistered(address medical);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyDoctor() {
        require(userRoles[msg.sender] == 1, "Only doctors can perform this action");
        _;
    }

    modifier onlyAuthorized() {
        require(
            userRoles[msg.sender] == 1 || 
            userRoles[msg.sender] == 2 || 
            userRoles[msg.sender] == 3,
            "Access denied!"
        );
        _;
    }

    constructor() {
        admin = msg.sender;
        userRoles[admin] = 1; // Admin is also a doctor
    }

    // 🔹 Doctors can register themselves
    function registerAsDoctor() public {
        require(userRoles[msg.sender] == 0, "Already registered");
        userRoles[msg.sender] = 1; // Assign role = Doctor (1)
        emit DoctorRegistered(msg.sender);
    }

    // 🔹 Doctors can add patients (auto-assign patient role)
    function addPatientData(
        string memory _patientId,
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _disease,
        address _patientAddress
    ) public onlyDoctor {
        require(!patients[_patientId].exists, "Patient already exists");

        patients[_patientId] = Patient({
            name: _name,
            age: _age,
            gender: _gender,
            disease: _disease,
            prescription: "",
            exists: true
        });

        userRoles[_patientAddress] = 2; // Assign role = Patient (2)

        emit PatientAdded(_patientId, _name, _age, _gender, _disease);
    }

    // 🔹 Only doctors can update prescriptions
    function updatePrescription(string memory _patientId, string memory _prescription) public onlyDoctor {
        require(patients[_patientId].exists, "Patient not found");

        patients[_patientId].prescription = _prescription;

        emit PrescriptionUpdated(_patientId, _prescription);
    }

    // 🔹 Doctors, patients & medical staff can view patient data
    function getPatientData(string memory _patientId)
        public
        view
        onlyAuthorized
        returns (string memory, uint, string memory, string memory, string memory)
    {
        require(patients[_patientId].exists, "Patient not found");

        Patient memory p = patients[_patientId];
        return (p.name, p.age, p.gender, p.disease, p.prescription);
    }

    // 🔹 Medical personnel can register themselves
    function registerAsMedical() public {
        require(userRoles[msg.sender] == 0, "Already registered");
        userRoles[msg.sender] = 3; // Assign role = Medical (3)
        emit MedicalRegistered(msg.sender);
    }
}
