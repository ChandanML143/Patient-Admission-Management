
package com.patientmanagement.patient_admission.controller;

import com.patientmanagement.patient_admission.entity.*;
import com.patientmanagement.patient_admission.repository.*;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://patient-admission-management-1.onrender.com"
})
@RestController
@RequestMapping("/api")
public class LookupController {

    private final GenderRepository genderRepository;
    private final WardRepository wardRepository;
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;

    public LookupController(
            GenderRepository genderRepository,
            WardRepository wardRepository,
            DepartmentRepository departmentRepository,
            DoctorRepository doctorRepository) {

        this.genderRepository = genderRepository;
        this.wardRepository = wardRepository;
        this.departmentRepository = departmentRepository;
        this.doctorRepository = doctorRepository;
    }

    @GetMapping("/genders")
    public List<Gender> getGenders() {
        return genderRepository.findAll();
    }

    @GetMapping("/wards")
    public List<Ward> getWards() {
        return wardRepository.findAll();
    }

    @GetMapping("/departments")
    public List<Department> getDepartments() {
        return departmentRepository.findAll();
    }

    @GetMapping("/doctors")
    public List<Doctor> getDoctors() {
        return doctorRepository.findAll();
    }
}
