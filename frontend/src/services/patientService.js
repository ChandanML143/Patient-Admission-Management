
const API_URL = "https://patient-admission-management-qbsi.onrender.com/api/patients";

export const getAllPatients = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch patients");
    }

    return response.json();
};

export async function addPatient(patient) {
    fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(patient)
    });

    if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
            errorData.message || "Failed to register patient"
        );
    }

    return await response.json();
}
