
package com.patientmanagement.patient_admission.repository;

import com.patientmanagement.patient_admission.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

}
