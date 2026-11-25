
import { useState } from "react";
import { addPatient } from "../services/patientService";

function PatientForm() {

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        genderId: "",
        wardId: "",
        departmentId: "",
        doctorId: "",
        admissionDate: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setError("");

        const patient = {
            ...formData,
            age: Number(formData.age),
            genderId: Number(formData.genderId),
            wardId: Number(formData.wardId),
            departmentId: Number(formData.departmentId),
            doctorId: Number(formData.doctorId),
        };

        try {
            setLoading(true);

            await addPatient(patient);

            setMessage("Patient registered successfully!");

            setFormData({
                name: "",
                age: "",
                genderId: "",
                wardId: "",
                departmentId: "",
                doctorId: "",
                admissionDate: "",
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="patient-form-container">

            <h2>Patient Registration</h2>
            <p>Enter patient details to register a new admission.</p>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <form className="patient-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Patient Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter patient name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter age"
                        min="0"
                        max="120"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <select name="genderId" value={formData.genderId}
                            onChange={handleChange} required>
                        <option value="">Select gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Ward</label>
                    <select name="wardId" value={formData.wardId}
                            onChange={handleChange} required>
                        <option value="">Select ward</option>
                        <option value="1">General Ward</option>
                        <option value="2">ICU</option>
                        <option value="3">Private Ward</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Department</label>
                    <select name="departmentId" value={formData.departmentId}
                            onChange={handleChange} required>
                        <option value="">Select department</option>
                        <option value="1">Cardiology</option>
                        <option value="2">Neurology</option>
                        <option value="3">Orthopedics</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Doctor</label>
                    <select name="doctorId" value={formData.doctorId}
                            onChange={handleChange} required>
                        <option value="">Select doctor</option>
                        <option value="1">Dr. Arun Kumar</option>
                        <option value="2">Dr. Priya Sharma</option>
                        <option value="3">Dr. Rahul Verma</option>
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

                <div className="form-buttons">
                    <button type="submit" className="save-btn" disabled={loading}>
                        {loading ? "Registering..." : "Register Patient"}
                    </button>
                </div>

            </form>
        </div>
    );
}

export default PatientForm;
