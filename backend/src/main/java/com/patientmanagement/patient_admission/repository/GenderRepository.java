
package com.patientmanagement.patient_admission.repository;

import com.patientmanagement.patient_admission.entity.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenderRepository extends JpaRepository<Gender, Integer> {

}

