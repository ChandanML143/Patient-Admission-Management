
package com.patientmanagement.patient_admission.controller;

import com.patientmanagement.patient_admission.dto.PatientRequest;
import com.patientmanagement.patient_admission.entity.Patient;
import com.patientmanagement.patient_admission.service.PatientService;
import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // Get all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // Get patient by ID
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Integer id) {
        return patientService.getPatientById(id);
    }

    // Add patient
    @PostMapping
    public Patient addPatient(@Valid @RequestBody PatientRequest request) {
        return patientService.addPatient(request);
    }

    // Update patient
    @PutMapping("/{id}")
    public Patient updatePatient(
            @PathVariable Integer id,
            @Valid @RequestBody PatientRequest request) {

        return patientService.updatePatient(id, request);
    }

    // Delete patient
    @DeleteMapping("/{id}")
    public String deletePatient(@PathVariable Integer id) {
        patientService.deletePatient(id);
        return "Patient deleted successfully";
    }


    // Search patients by name
    @GetMapping("/search")
    public List<Patient> searchPatients(@RequestParam String name) {
        return patientService.searchPatients(name);
    }

    // Filter by ward
    @GetMapping("/filter/ward/{wardId}")
    public List<Patient> filterByWard(@PathVariable Integer wardId) {
        return patientService.filterByWard(wardId);
    }

    // Filter by department
    @GetMapping("/filter/department/{departmentId}")
    public List<Patient> filterByDepartment(@PathVariable Integer departmentId) {
        return patientService.filterByDepartment(departmentId);
    }

    // Filter by doctor
    @GetMapping("/filter/doctor/{doctorId}")
    public List<Patient> filterByDoctor(@PathVariable Integer doctorId) {
        return patientService.filterByDoctor(doctorId);
    }

    // Discharge patient
    @PatchMapping("/{id}/discharge")
    public Patient dischargePatient(@PathVariable Integer id) {
        return patientService.dischargePatient(id);
    }

}
