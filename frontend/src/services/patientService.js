
const API_URL = "https://patient-admission-management-qbsi.onrender.com/api/patients";

// Get all patients
export const getAllPatients = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch patients");
    }

    return await response.json();
};

// Add a new patient
export async function addPatient(patient) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(patient)
    });

    if (!response.ok) {
        const errorText = await response.text();

        let errorMessage = "Failed to register patient";

        try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
            if (errorText) errorMessage = errorText;
        }

        throw new Error(errorMessage);
    }

    return await response.json();
}
