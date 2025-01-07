package com.example.BMS_BackEnd.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BMS_BackEnd.Model.BankDetails;

public interface BankDAO extends JpaRepository<BankDetails, Long> {
	List<BankDetails> findByBranchCode(String branchCode);
}
