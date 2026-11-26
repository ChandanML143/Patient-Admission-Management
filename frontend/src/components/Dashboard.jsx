
import { useEffect, useState } from "react";

const API = "https://patient-admission-management-qbsi.onrender.com/api";

function Dashboard({ patients }) {
    const [totalWards, setTotalWards] = useState(0);

    useEffect(() => {
        const fetchWards = async () => {
            try {
                const response = await fetch(`${API}/wards`);

                if (!response.ok) {
                    throw new Error("Failed to fetch wards");
                }

                const data = await response.json();
                setTotalWards(data.length);
            } catch (error) {
                console.error("Ward fetching error:", error);
            }
        };

        fetchWards();
    }, []);

    const totalPatients = patients.length;

    const admittedPatients = patients.filter(
        patient => patient.status === "Admitted"
    ).length;

    const dischargedPatients = patients.filter(
        patient => patient.status === "Discharged"
    ).length;

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h2>Dashboard Overview</h2>
                    <p>Welcome to PatientCare Management System</p>
                </div>
            </div>

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
