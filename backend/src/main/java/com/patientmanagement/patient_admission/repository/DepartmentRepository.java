
package com.patientmanagement.patient_admission.repository;

import com.patientmanagement.patient_admission.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

}
