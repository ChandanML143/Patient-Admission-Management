package com.patientmanagement.patient_admission.repository;

import com.patientmanagement.patient_admission.entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WardRepository extends JpaRepository<Ward, Integer> {

}

