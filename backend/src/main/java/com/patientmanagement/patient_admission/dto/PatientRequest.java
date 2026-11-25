
package com.patientmanagement.patient_admission.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class PatientRequest {

    @NotBlank(message = "Patient name is required")
    @Pattern(
            regexp = "^[a-zA-Z ]+$",
            message = "Name must contain only letters and spaces"
    )
    private String name;

    @NotNull(message = "Age is required")
    @Min(value = 0, message = "Age cannot be less than 0")
    @Max(value = 120, message = "Age cannot exceed 120")
    private Integer age;

    @NotNull(message = "Gender is required")
    private Integer genderId;

    @NotNull(message = "Ward is required")
    private Integer wardId;

    @NotNull(message = "Department is required")
    private Integer departmentId;

    @NotNull(message = "Doctor is required")
    private Integer doctorId;

    @NotNull(message = "Admission date is required")
    @PastOrPresent(message = "Admission date cannot be in the future")
    private LocalDate admissionDate;

    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getGenderId() {
        return genderId;
    }

    public void setGenderId(Integer genderId) {
        this.genderId = genderId;
    }

    public Integer getWardId() {
        return wardId;
    }

    public void setWardId(Integer wardId) {
        this.wardId = wardId;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDate getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(LocalDate admissionDate) {
        this.admissionDate = admissionDate;
    }
}
