
import { useEffect, useState } from "react";

const API = "https://patient-admission-management-qbsi.onrender.com/api";

function Dashboard() {
    const [patients, setPatients] = useState([]);
    const [totalWards, setTotalWards] = useState(0);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch all patients
            const patientResponse = await fetch(`${API}/patients`);

            if (!patientResponse.ok) {
                throw new Error("Failed to fetch patients");
            }

            const patientData = await patientResponse.json();
            setPatients(patientData);

            // Fetch all wards
            const wardResponse = await fetch(`${API}/wards`);

            if (!wardResponse.ok) {
                throw new Error("Failed to fetch wards");
            }

            const wardData = await wardResponse.json();
            setTotalWards(wardData.length);

        } catch (error) {
            console.error("Dashboard error:", error);
        }
    };

    const totalPatients = patients.length;

    const admittedPatients = patients.filter(
        patient => patient.status === "Admitted"
    ).length;

    const dischargedPatients = patients.filter(
        patient => patient.status === "Discharged"
    ).length;

    return (
        <div className="dashboard">

            {/* Dashboard Heading */}
            <div className="dashboard-header">
                <div>
                    <h2>Dashboard Overview</h2>
                    <p>Welcome to PatientCare Management System</p>
                </div>

            </div>

            {/* Statistics Cards */}
            <div className="stats-container">

                <div className="stat-card">
                    <h3>Total Patients</h3>
                    <h2>{totalPatients}</h2>
                </div>

                <div className="stat-card">
                    <h3>Admitted Patients</h3>
                    <h2>{admittedPatients}</h2>
                </div>

                <div className="stat-card">
                    <h3>Discharged Patients</h3>
                    <h2>{dischargedPatients}</h2>
                </div>

                <div className="stat-card">
                    <h3>Total Wards</h3>
                    <h2>{totalWards}</h2>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;
