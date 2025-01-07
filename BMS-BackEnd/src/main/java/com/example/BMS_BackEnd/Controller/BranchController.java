package com.example.BMS_BackEnd.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.BMS_BackEnd.Model.BranchDetails;
import com.example.BMS_BackEnd.Service.BranchService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BranchController {

	@Autowired
	private BranchService branchService;

	@PostMapping("/api/addBranch")
	public ResponseEntity<?> addBranch(@RequestBody BranchDetails data) {
		try {
			branchService.addBranchDetails(data);
			return ResponseEntity.ok("success");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/api/getBranch")
	public ResponseEntity<List<BranchDetails>> getAllBranches() {
		try {
			List<BranchDetails> branches = branchService.getAllBranches();
			return ResponseEntity.ok(branches);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/api/viewBranch/{branchCode}")
	public ResponseEntity<BranchDetails> getBranchByCode1(@PathVariable("branchCode") String Code) {
		try {
			BranchDetails branch = branchService.getBranchByCode(Code);
			return ResponseEntity.ok(branch);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/api/editBranch/{branchCode}")
	public ResponseEntity<BranchDetails> getBranchByCode2(@PathVariable("branchCode") String Code) {
		try {
			BranchDetails branch = branchService.getBranchByCode(Code);
			return ResponseEntity.ok(branch);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/api/history/{branchCode}")
	public ResponseEntity<BranchDetails> getBranch(@PathVariable("branchCode") String code) {
		try {
			BranchDetails branch = branchService.getBranchByCode(code);
			return ResponseEntity.ok(branch);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}

}
