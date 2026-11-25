package com.patientmanagement.patient_admission.repository;

import com.patientmanagement.patient_admission.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

    // Search patients by name
    List<Patient> findByNameContainingIgnoreCase(String name);

    // Filter by ward
    List<Patient> findByWardId(Integer wardId);

    // Filter by department
    List<Patient> findByDepartmentId(Integer departmentId);

    // Filter by doctor
    List<Patient> findByDoctorId(Integer doctorId);

    boolean existsByNameIgnoreCaseAndAgeAndGenderIdAndAdmissionDate(
            String name,
            Integer age,
            Integer genderId,
            LocalDate admissionDate
    );
}
