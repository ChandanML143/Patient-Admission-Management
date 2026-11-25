
package com.patientmanagement.patient_admission.service;

import com.patientmanagement.patient_admission.dto.PatientRequest;
import com.patientmanagement.patient_admission.entity.*;
import com.patientmanagement.patient_admission.repository.*;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final GenderRepository genderRepository;
    private final WardRepository wardRepository;
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;

    public PatientService(
            PatientRepository patientRepository,
            GenderRepository genderRepository,
            WardRepository wardRepository,
            DepartmentRepository departmentRepository,
            DoctorRepository doctorRepository) {

        this.patientRepository = patientRepository;
        this.genderRepository = genderRepository;
        this.wardRepository = wardRepository;
        this.departmentRepository = departmentRepository;
        this.doctorRepository = doctorRepository;
    }

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get patient by ID
    public Patient getPatientById(Integer id) {
        return patientRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Patient not found"));
    }

    // Add patient
    public Patient addPatient(PatientRequest request) {

        boolean alreadyExists =
                patientRepository.existsByNameIgnoreCaseAndAgeAndGenderIdAndAdmissionDate(
                        request.getName(),
                        request.getAge(),
                        request.getGenderId(),
                        request.getAdmissionDate()
                );

        if (alreadyExists) {
            throw new RuntimeException(
                    "Patient already registered with the same details!"
            );
        }

        Patient patient = new Patient();

        patient.setName(request.getName());
        patient.setAge(request.getAge());

        patient.setGender(
                genderRepository.findById(request.getGenderId())
                        .orElseThrow(() ->
                                new RuntimeException("Gender not found"))
        );

        patient.setWard(
                wardRepository.findById(request.getWardId())
                        .orElseThrow(() ->
                                new RuntimeException("Ward not found"))
        );

        patient.setDepartment(
                departmentRepository.findById(request.getDepartmentId())
                        .orElseThrow(() ->
                                new RuntimeException("Department not found"))
        );

        patient.setDoctor(
                doctorRepository.findById(request.getDoctorId())
                        .orElseThrow(() ->
                                new RuntimeException("Doctor not found"))
        );

        patient.setAdmissionDate(request.getAdmissionDate());

        return patientRepository.save(patient);
    }

    // Update patient
    public Patient updatePatient(Integer id, PatientRequest request) {

        Patient patient = getPatientById(id);

        patient.setName(request.getName());
        patient.setAge(request.getAge());

        patient.setGender(
                genderRepository.findById(request.getGenderId())
                        .orElseThrow(() ->
                                new RuntimeException("Gender not found"))
        );

        patient.setWard(
                wardRepository.findById(request.getWardId())
                        .orElseThrow(() ->
                                new RuntimeException("Ward not found"))
        );

        patient.setDepartment(
                departmentRepository.findById(request.getDepartmentId())
                        .orElseThrow(() ->
                                new RuntimeException("Department not found"))
        );

        patient.setDoctor(
                doctorRepository.findById(request.getDoctorId())
                        .orElseThrow(() ->
                                new RuntimeException("Doctor not found"))
        );

        patient.setAdmissionDate(request.getAdmissionDate());

        return patientRepository.save(patient);
    }

    // Delete patient
    public void deletePatient(Integer id) {
        Patient patient = getPatientById(id);
        patientRepository.delete(patient);
    }


    // Search patients by name
    public List<Patient> searchPatients(String name) {
        return patientRepository.findByNameContainingIgnoreCase(name);
    }

    // Filter patients by ward
    public List<Patient> filterByWard(Integer wardId) {
        return patientRepository.findByWardId(wardId);
    }

    // Filter patients by department
    public List<Patient> filterByDepartment(Integer departmentId) {
        return patientRepository.findByDepartmentId(departmentId);
    }

    // Filter patients by doctor
    public List<Patient> filterByDoctor(Integer doctorId) {
        return patientRepository.findByDoctorId(doctorId);
    }


    // Discharge patient

    public Patient dischargePatient(Integer id) {

        Patient patient = getPatientById(id);

        patient.setStatus(PatientStatus.Discharged);

        return patientRepository.save(patient);
    }


}
