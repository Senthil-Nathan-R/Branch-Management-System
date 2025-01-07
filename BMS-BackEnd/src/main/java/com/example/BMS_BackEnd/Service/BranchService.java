package com.example.BMS_BackEnd.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BMS_BackEnd.DAO.BankDAO;
import com.example.BMS_BackEnd.DAO.BranchDAO;
import com.example.BMS_BackEnd.Model.BankDetails;
import com.example.BMS_BackEnd.Model.BranchDetails;

@Service
public class BranchService {

	@Autowired
	private BranchDAO branch;

	@Autowired
	private BankDAO bank;

	public void addBranchDetails(BranchDetails branchDetails) {
		branch.save(branchDetails);

		List<BankDetails> Bank = branchDetails.getBankDetails();
		String brncode = branchDetails.getBranchCode();
		for (BankDetails i : Bank) {
			i.setBranchCode(brncode);
			bank.save(i);

		}
	}

	public List<BranchDetails> getAllBranches() {
		return branch.findAll();
	}

	public BranchDetails getBranchByCode(String branchCode) {

		BranchDetails br = branch.findByBranchCode(branchCode);

		List<BankDetails> bankDetails = bank.findByBranchCode(branchCode);
		br.setBankDetails(bankDetails);

		return br;
	}

}