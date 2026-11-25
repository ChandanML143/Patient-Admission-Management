
import { useEffect, useState } from "react";

const API = "http://localhost:8080/api";

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [genders, setGenders] = useState([]);
    const [wards, setWards] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [deletingId, setDeletingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        genderId: "",
        wardId: "",
        departmentId: "",
        doctorId: "",
        admissionDate: ""
    });

    // Fetch all patients
    const fetchPatients = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API}/patients`);

            if (!response.ok) {
                throw new Error("Failed to fetch patients");
            }

            const data = await response.json();
            setPatients(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch dropdown data
    const fetchDropdownData = async () => {
        try {
            const endpoints = [
                `${API}/genders`,
                `${API}/wards`,
                `${API}/departments`,
                `${API}/doctors`
            ];

            const responses = await Promise.all(
                endpoints.map(url => fetch(url))
            );

            if (responses.some(response => !response.ok)) {
                throw new Error("Failed to load dropdown data");
            }

            const [
                genderData,
                wardData,
                departmentData,
                doctorData
            ] = await Promise.all(
                responses.map(response => response.json())
            );

            setGenders(genderData);
            setWards(wardData);
            setDepartments(departmentData);
            setDoctors(doctorData);

        } catch (err) {
            console.error("Dropdown error:", err);
        }
    };

    useEffect(() => {
        fetchPatients();
        fetchDropdownData();
    }, []);

    // Search and filter
    const filteredPatients = patients.filter(patient => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            patient.name?.toLowerCase().includes(search) ||
            String(patient.id).includes(search);

        const matchesStatus =
            statusFilter === "All" ||
            patient.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Open patient details
    const handleView = (patient) => {
        setSelectedPatient(patient);
        setIsEditing(false);
        setSuccess("");
        setError("");
    };

    // Open edit form
    const handleEdit = () => {
        setFormData({
            name: selectedPatient.name || "",
            age: selectedPatient.age ?? "",
            genderId: selectedPatient.gender?.id ?? "",
            wardId: selectedPatient.ward?.id ?? "",
            departmentId: selectedPatient.department?.id ?? "",
            doctorId: selectedPatient.doctor?.id ?? "",
            admissionDate: selectedPatient.admissionDate || ""
        });

        setIsEditing(true);
        setError("");
        setSuccess("");
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Update patient
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const payload = {
                name: formData.name.trim(),
                age: Number(formData.age),
                genderId: Number(formData.genderId),
                wardId: Number(formData.wardId),
                departmentId: Number(formData.departmentId),
                doctorId: Number(formData.doctorId),
                admissionDate: formData.admissionDate
            };

            const response = await fetch(
                `${API}/patients/${selectedPatient.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || "Failed to update patient");
            }

            setSuccess("Patient updated successfully!");

            await fetchPatients();

            setSelectedPatient(null);
            setIsEditing(false);

        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };


// Delete patient
    const handleDelete = async (patient) => {

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${patient.name}?`
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setDeletingId(patient.id);
            setError("");
            setSuccess("");

            const response = await fetch(
                `${API}/patients/${patient.id}`,
                {
                    method: "DELETE"
                }
                );

            if (!response.ok) {
                throw new Error("Failed to delete patient");
            }

            setSuccess("Patient deleted successfully!");
                    // Close details modal if the deleted patient is selected
            if (selectedPatient?.id === patient.id) {
                setSelectedPatient(null);
            }
                    // Refresh patient records
            await fetchPatients();

        } catch (err) {
            setError(err.message);
        } finally {
            setDeletingId(null);
        }
    };if (loading) return <p>Loading patients...</p>;

    // Discharge patient
    const handleDischarge = async (patient) => {
        const confirmDischarge = window.confirm(
            `Are you sure you want to discharge ${patient.name}?`
        );

        if (!confirmDischarge) return;

        try {
            setError("");
            setSuccess("");

            const response = await fetch(
                `${API}/patients/${patient.id}/discharge`,
                {
                    method: "PATCH"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to discharge patient");
            }

            setSuccess("Patient discharged successfully!");

            await fetchPatients();

        } catch (err) {
            setError(err.message);
        }
    };


    if (error && !selectedPatient) {
        return <p className="error">{error}</p>;
    }

    return (
        <section className="patient-list">

            <h2>Patient Records</h2>

            {/* Search and Filter */}
            <div className="patient-controls">

                <input
                    type="text"
                    placeholder="Search by patient name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Patients</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Discharged">Discharged</option>
                </select>

                <button onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("All");
                }}>
                    Clear
                </button>

            </div>

            {success && (
                <p className="success-message">{success}</p>
            )}

            <p className="patient-count">
                Showing {filteredPatients.length} of {patients.length} patients
            </p>

            {filteredPatients.length === 0 ? (
                <p>No matching patients found.</p>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Ward</th>
                            <th>Department</th>
                            <th>Doctor</th>
                            <th>Admission Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filteredPatients.map((patient, index) => (
                            <tr key={patient.id}>
                                <td>{index + 1}</td>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.gender?.name}</td>
                                <td>{patient.ward?.name}</td>
                                <td>{patient.department?.name}</td>
                                <td>{patient.doctor?.name}</td>
                                <td>{patient.admissionDate}</td>

                                <td>
                                        <span className={
                                                  patient.status === "Admitted"
                                                      ? "status-admitted"
                                                      : "status-discharged"
                                              }>
                                            {patient.status}
                                        </span>
                                </td>


                                <td>
                                    <div className="action-buttons">

                                        <button
                                            className="view-btn"
                                            onClick={() => handleView(patient)}
                                        >
                                            View
                                        </button>

                                        {patient.status === "Admitted" && (
                                            <button
                                                className="discharge-btn"
                                                onClick={() => handleDischarge(patient)}
                                            >
                                                Discharge
                                            </button>
                                        )}

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(patient)}
                                            disabled={deletingId === patient.id}
                                        >
                                            {deletingId === patient.id ? "Deleting..." : "Delete"}
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Patient Modal */}
            {selectedPatient && (
                <div className="modal-overlay">
                    <div className="patient-modal">

                        <div className="modal-header">
                            <h2>
                                {isEditing
                                    ? "Edit Patient"
                                    : "Patient Details"}
                            </h2>

                            <button
                                className="close-btn"
                                onClick={() => {
                                    setSelectedPatient(null);
                                    setIsEditing(false);
                                    setError("");
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {error && (
                            <p className="error-message">{error}</p>
                        )}

                        {!isEditing ? (

                            <>
                                <div className="patient-details">
                                    <p><strong>Patient ID:</strong> {selectedPatient.id}</p>
                                    <p><strong>Name:</strong> {selectedPatient.name}</p>
                                    <p><strong>Age:</strong> {selectedPatient.age}</p>
                                    <p><strong>Gender:</strong> {selectedPatient.gender?.name}</p>
                                    <p><strong>Ward:</strong> {selectedPatient.ward?.name}</p>
                                    <p><strong>Department:</strong> {selectedPatient.department?.name}</p>
                                    <p><strong>Doctor:</strong> {selectedPatient.doctor?.name}</p>
                                    <p><strong>Admission Date:</strong> {selectedPatient.admissionDate}</p>
                                    <p><strong>Status:</strong> {selectedPatient.status}</p>
                                </div>

                                <div className="modal-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={handleEdit}
                                    >
                                        Edit Patient
                                    </button>

                                    <button
                                        className="modal-close"
                                        onClick={() => setSelectedPatient(null)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </>

                        ) : (

                            <form onSubmit={handleUpdate} className="edit-form">

                                <div className="form-group">
                                    <label>Patient Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        pattern="[A-Za-z ]+"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        min="1"
                                        max="120"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Gender</label>
                                    <select
                                        name="genderId"
                                        value={formData.genderId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select gender</option>
                                        {genders.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Ward</label>
                                    <select
                                        name="wardId"
                                        value={formData.wardId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select ward</option>
                                        {wards.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Department</label>
                                    <select
                                        name="departmentId"
                                        value={formData.departmentId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select department</option>
                                        {departments.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Doctor</label>
                                    <select
                                        name="doctorId"
                                        value={formData.doctorId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select doctor</option>
                                        {doctors.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Admission Date</label>
                                    <input
                                        type="date"
                                        name="admissionDate"
                                        value={formData.admissionDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="edit-buttons">
                                    <button
                                        type="submit"
                                        className="save-btn"
                                        disabled={saving}
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>

                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setError("");
                                        }}
                                        disabled={saving}
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </form>
                        )}

                    </div>
                </div>
            )}

        </section>
    );
}

export default PatientList;
