package com.example.BMS_BackEnd.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BMS_BackEnd.Model.BranchDetails;

public interface BranchDAO extends JpaRepository<BranchDetails, Long> {
	BranchDetails findByBranchCode(String branchCode);
}
