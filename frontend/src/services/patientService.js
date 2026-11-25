
const API_URL = "http://localhost:8080/api/patients";

export const getAllPatients = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch patients");
    }

    return response.json();
};

export async function addPatient(patient) {
    const response = await fetch("http://localhost:8080/api/patients", {
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
