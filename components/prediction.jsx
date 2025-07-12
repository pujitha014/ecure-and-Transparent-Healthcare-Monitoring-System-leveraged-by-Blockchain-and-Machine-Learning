import { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

const Prediction = () => {
    const [symptomsData, setSymptomsData] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState(Array(6).fill(""));
    const [predictionResult, setPredictionResult] = useState("");

    useEffect(() => {
        setSymptomsData([
            {"index":0,"Symptom":"itching","weight":1},
            {"index":1,"Symptom":"skin_rash","weight":2},
            {"index":2,"Symptom":"nodal_skin_eruptions","weight":3},
            {"index":3,"Symptom":"continuous_sneezing","weight":4},
            {"index":4,"Symptom":"shivering","weight":5},
            {"index":5,"Symptom":"chills","weight":6},
            {"index":6,"Symptom":"joint_pain","weight":7},
            {"index":7,"Symptom":"stomach_pain","weight":8},
            {"index":8,"Symptom":"acidity","weight":9},
            {"index":9,"Symptom":"ulcers_on_tongue","weight":10},
            {"index":10,"Symptom":"muscle_wasting","weight":11},
            {"index":11,"Symptom":"vomiting","weight":12},
            {"index":12,"Symptom":"burning_micturition","weight":13},
            {"index":13,"Symptom":"spotting_urination","weight":14},
            {"index":14,"Symptom":"fatigue","weight":15},
            {"index":15,"Symptom":"weight_gain","weight":16},
            {"index":16,"Symptom":"anxiety","weight":17},
            {"index":17,"Symptom":"cold_hands_and_feets","weight":18},
            {"index":18,"Symptom":"mood_swings","weight":19},
            {"index":19,"Symptom":"weight_loss","weight":20},
            {"index":20,"Symptom":"restlessness","weight":21},
            {"index":21,"Symptom":"lethargy","weight":22},
            {"index":22,"Symptom":"patches_in_throat","weight":23},
            {"index":23,"Symptom":"irregular_sugar_level","weight":24},
            {"index":24,"Symptom":"cough","weight":25},
            {"index":25,"Symptom":"high_fever","weight":26},
            {"index":26,"Symptom":"sunken_eyes","weight":27},
            {"index":27,"Symptom":"breathlessness","weight":28},
            {"index":28,"Symptom":"sweating","weight":29},
            {"index":29,"Symptom":"dehydration","weight":30},
            {"index":30,"Symptom":"indigestion","weight":31},
            {"index":31,"Symptom":"headache","weight":32},
            {"index":32,"Symptom":"yellowish_skin","weight":33},
            {"index":33,"Symptom":"dark_urine","weight":34},
            {"index":34,"Symptom":"nausea","weight":35},
            {"index":35,"Symptom":"loss_of_appetite","weight":36},
            {"index":36,"Symptom":"pain_behind_the_eyes","weight":37},
            {"index":37,"Symptom":"back_pain","weight":38},
            {"index":38,"Symptom":"constipation","weight":39},
            {"index":39,"Symptom":"abdominal_pain","weight":40},
            {"index":40,"Symptom":"diarrhoea","weight":41},
            {"index":41,"Symptom":"mild_fever","weight":42},
            {"index":42,"Symptom":"yellow_urine","weight":43},
            {"index":43,"Symptom":"yellowing_of_eyes","weight":44},
            {"index":44,"Symptom":"acute_liver_failure","weight":45},
            {"index":45,"Symptom":"fluid_overload","weight":46},
            {"index":46,"Symptom":"swelling_of_stomach","weight":47},
            {"index":47,"Symptom":"swelled_lymph_nodes","weight":48},
            {"index":48,"Symptom":"malaise","weight":49},
            {"index":49,"Symptom":"blurred_and_distorted_vision","weight":50},
            {"index":50,"Symptom":"phlegm","weight":51},
            {"index":51,"Symptom":"throat_irritation","weight":52},
            {"index":52,"Symptom":"redness_of_eyes","weight":53},
            {"index":53,"Symptom":"sinus_pressure","weight":54},
            {"index":54,"Symptom":"runny_nose","weight":55},
            {"index":55,"Symptom":"congestion","weight":56},
            {"index":56,"Symptom":"chest_pain","weight":57},
            {"index":57,"Symptom":"weakness_in_limbs","weight":58},
            {"index":58,"Symptom":"fast_heart_rate","weight":59},
            {"index":59,"Symptom":"pain_during_bowel_movements","weight":60},
            {"index":60,"Symptom":"pain_in_anal_region","weight":61},
            {"index":61,"Symptom":"bloody_stool","weight":62},
            {"index":62,"Symptom":"irritation_in_anus","weight":63},
            {"index":63,"Symptom":"neck_pain","weight":64},
            {"index":64,"Symptom":"dizziness","weight":65},
            {"index":65,"Symptom":"cramps","weight":66},
            {"index":66,"Symptom":"bruising","weight":67},
            {"index":67,"Symptom":"obesity","weight":68},
            {"index":68,"Symptom":"swollen_legs","weight":69},
            {"index":69,"Symptom":"swollen_blood_vessels","weight":70},
            {"index":70,"Symptom":"puffy_face_and_eyes","weight":71},
            {"index":71,"Symptom":"enlarged_thyroid","weight":72},
            {"index":72,"Symptom":"brittle_nails","weight":73},
            {"index":73,"Symptom":"swollen_extremeties","weight":74},
            {"index":74,"Symptom":"excessive_hunger","weight":75},
            {"index":75,"Symptom":"extra_marital_contacts","weight":76},
            {"index":76,"Symptom":"drying_and_tingling_lips","weight":77},
            {"index":77,"Symptom":"slurred_speech","weight":78},
            {"index":78,"Symptom":"knee_pain","weight":79},
            {"index":79,"Symptom":"hip_joint_pain","weight":80},
            {"index":80,"Symptom":"muscle_weakness","weight":81},
            {"index":81,"Symptom":"stiff_neck","weight":82},
            {"index":82,"Symptom":"swelling_joints","weight":83},
            {"index":83,"Symptom":"movement_stiffness","weight":84},
            {"index":84,"Symptom":"spinning_movements","weight":85},
            {"index":85,"Symptom":"loss_of_balance","weight":86},
            {"index":86,"Symptom":"unsteadiness","weight":87},
            {"index":87,"Symptom":"weakness_of_one_body_side","weight":88},
            {"index":88,"Symptom":"loss_of_smell","weight":89},
            {"index":89,"Symptom":"bladder_discomfort","weight":90},
            {"index":90,"Symptom":"foul_smell_of_urine","weight":91},
            {"index":91,"Symptom":"continuous_feel_of_urine","weight":92},
            {"index":92,"Symptom":"passage_of_gases","weight":93},
            {"index":93,"Symptom":"internal_itching","weight":94},
            {"index":94,"Symptom":"toxic_look_(typhos)","weight":95},
            {"index":95,"Symptom":"depression","weight":96},
            {"index":96,"Symptom":"irritability","weight":97},
            {"index":97,"Symptom":"muscle_pain","weight":98},
            {"index":98,"Symptom":"altered_sensorium","weight":99},
            {"index":99,"Symptom":"red_spots_over_body","weight":100},
            {"index":100,"Symptom":"belly_pain","weight":101},
            {"index":101,"Symptom":"abnormal_menstruation","weight":102},
            {"index":102,"Symptom":"dischromic_patches","weight":103},
            {"index":103,"Symptom":"watering_from_eyes","weight":104},
            {"index":104,"Symptom":"increased_appetite","weight":105},
            {"index":105,"Symptom":"polyuria","weight":106},
            {"index":106,"Symptom":"family_history","weight":107},
            {"index":107,"Symptom":"mucoid_sputum","weight":108},
            {"index":108,"Symptom":"rusty_sputum","weight":109},
            {"index":109,"Symptom":"lack_of_concentration","weight":110},
            {"index":110,"Symptom":"visual_disturbances","weight":111},
            {"index":111,"Symptom":"receiving_blood_transfusion","weight":112},
            {"index":112,"Symptom":"receiving_unsterile_injections","weight":113},
            {"index":113,"Symptom":"coma","weight":114},
            {"index":114,"Symptom":"stomach_bleeding","weight":115},
            {"index":115,"Symptom":"distention_of_abdomen","weight":116},
            {"index":116,"Symptom":"history_of_alcohol_consumption","weight":117},
            {"index":117,"Symptom":"fluid_overload","weight":118},
            {"index":118,"Symptom":"blood_in_sputum","weight":119},
            {"index":119,"Symptom":"prominent_veins_on_calf","weight":120},
            {"index":120,"Symptom":"palpitations","weight":121},
            {"index":121,"Symptom":"painful_walking","weight":122},
            {"index":122,"Symptom":"pus_filled_pimples","weight":123},
            {"index":123,"Symptom":"blackheads","weight":124},
            {"index":124,"Symptom":"scurring","weight":125},
            {"index":125,"Symptom":"skin_peeling","weight":126},
            {"index":126,"Symptom":"silver_like_dusting","weight":127},
            {"index":127,"Symptom":"small_dents_in_nails","weight":128},
            {"index":128,"Symptom":"inflammatory_nails","weight":129},
            {"index":129,"Symptom":"blister","weight":130},
            {"index":130,"Symptom":"red_sore_around_nose","weight":131},
            {"index":131,"Symptom":"yellow_crust_ooze","weight":132},
            {"index":132,"Symptom":"Nothing","weight":0},
        ]); // Shortened for brevity
    }, []);

    const handleSymptomChange = (index, value) => {
        const updatedSymptoms = [...selectedSymptoms];
        updatedSymptoms[index] = parseInt(value, 10);
        setSelectedSymptoms(updatedSymptoms);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const symptomsArray = Array(17).fill(0);
        selectedSymptoms.forEach((value, index) => {
            symptomsArray[index] = value;
        });

        try {
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symptoms: symptomsArray }),
            });
            if (response.ok) {
                const result = await response.json();
                setPredictionResult(`Predicted Disease: ${result.prediction}`);
            } else {
                alert("Prediction failed. Try again.");
            }
        } catch (error) {
            console.error("Error fetching prediction:", error);
        }
    };

    

    return (
            <Card sx={{ width: 400, p: 3, borderRadius: 2,  boxShadow: "0 10px 20px rgb(0, 0, 0)", backgroundColor: "#fff" }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
                        Disease Prediction
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box display="grid" gap={2}>
                            {[...Array(6)].map((_, index) => (
                                <FormControl fullWidth key={index}>
                                    <InputLabel>Select Symptom {index + 1}</InputLabel>
                                    <Select
                                        value={selectedSymptoms[index]}
                                        onChange={(e) => handleSymptomChange(index, e.target.value)}
                                    >
                                        <MenuItem value="">-- Select a Symptom --</MenuItem>
                                        {symptomsData.map((symptom) => (
                                            <MenuItem key={symptom.index} value={symptom.weight}>
                                                {symptom.Symptom.replace(/_/g, " ")}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ))}
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                width: "100%",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                backgroundColor: "#1976d2",
                                ':hover': { backgroundColor: "#1565c0" }
                            }}
                        >
                            Predict
                        </Button>
                    </form>
                    {predictionResult && (
                        <Typography mt={3} textAlign="center" fontWeight="bold" color="green">
                            {predictionResult}
                        </Typography>
                    )}
                </CardContent>
            </Card>
    );
};

export default Prediction;
