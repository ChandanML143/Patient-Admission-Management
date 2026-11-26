
import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";

const API = "https://patient-admission-management-qbsi.onrender.com/api";

function App() {
    const [patients, setPatients] = useState([]);

    const fetchPatients = useCallback(async () => {
        try {
            const response = await fetch(`${API}/patients`);

            if (!response.ok) {
                throw new Error("Failed to fetch patients");
            }

            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    }, []);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    return (
        <div>
            <Navbar />

            <main className="main-content">
                <h1>Patient Admission Management</h1>
                <p>Manage hospital patients and admission records.</p>

                <Dashboard patients={patients} />

                <PatientForm onPatientAdded={fetchPatients} />

                <PatientList
                    patients={patients}
                    setPatients={setPatients}
                    onPatientsChanged={fetchPatients}
                />
            </main>
        </div>
    );
}

export default App;
