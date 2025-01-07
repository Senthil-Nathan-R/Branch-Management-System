package com.example.BMS_BackEnd.Model;

import java.sql.Date;
import java.util.List;

import org.springframework.context.annotation.Scope;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@Scope("prototype")
public class BranchDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String branchCode;
	private String branchName;
	private String branchShortName;
	private String doorNo;
	private String street;
	private String pincode;
	private String locality;
	private String city;
	private String state;
	private String panno;
	private String gstin;
	private String branchType;

	@ElementCollection
	private List<String> vehicleType;

	private String branchContactNo;
	private String branchAlternaterContactNo;
	private String branchWhatsappNo;
	private String branchEmailID;

	private String inchargerName;
	private String inchargerContactNo;
	private String inchargerAlternateContactNo;
	private String inchargerWhatsappNo;
	private String inchargerEmailID;

	private String contactPersonName;
	private String contactPersonContactNo;
	private String contactPersonAlternateContactNo;
	private String contactPersonWhatsappNo;
	private String contactPersonEMailID;

	private Double openingBalance;
	private Date openingDate;

	private Double minimumAmount;
	private Double maximumAmount;
	private Double monthlyMaximumAmount;
	private Double maximumUnsettledAmount;
	private Date effectiveDate;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "branch")
	private List<BankDetails> bankDetails;

	// getters and setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getBranchShortName() {
		return branchShortName;
	}

	public void setBranchShortName(String branchShortName) {
		this.branchShortName = branchShortName;
	}

	public String getDoorNo() {
		return doorNo;
	}

	public void setDoorNo(String doorNo) {
		this.doorNo = doorNo;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPanno() {
		return panno;
	}

	public void setPanno(String panno) {
		this.panno = panno;
	}

	public String getGstin() {
		return gstin;
	}

	public void setGstin(String gstin) {
		this.gstin = gstin;
	}

	public String getBranchType() {
		return branchType;
	}

	public void setBranchType(String branchType) {
		this.branchType = branchType;
	}

	public List<String> getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(List<String> vehicleType) {
		this.vehicleType = vehicleType;
	}

	public String getBranchContactNo() {
		return branchContactNo;
	}

	public void setBranchContactNo(String branchContactNo) {
		this.branchContactNo = branchContactNo;
	}

	public String getBranchAlternaterContactNo() {
		return branchAlternaterContactNo;
	}

	public void setBranchAlternaterContactNo(String branchAlternaterContactNo) {
		this.branchAlternaterContactNo = branchAlternaterContactNo;
	}

	public String getBranchWhatsappNo() {
		return branchWhatsappNo;
	}

	public void setBranchWhatsappNo(String branchWhatsappNo) {
		this.branchWhatsappNo = branchWhatsappNo;
	}

	public String getBranchEmailID() {
		return branchEmailID;
	}

	public void setBranchEmailID(String branchEmailID) {
		this.branchEmailID = branchEmailID;
	}

	public String getInchargerName() {
		return inchargerName;
	}

	public void setInchargerName(String inchargerName) {
		this.inchargerName = inchargerName;
	}

	public String getInchargerContactNo() {
		return inchargerContactNo;
	}

	public void setInchargerContactNo(String inchargerContactNo) {
		this.inchargerContactNo = inchargerContactNo;
	}

	public String getInchargerAlternateContactNo() {
		return inchargerAlternateContactNo;
	}

	public void setInchargerAlternateContactNo(String inchargerAlternateContactNo) {
		this.inchargerAlternateContactNo = inchargerAlternateContactNo;
	}

	public String getInchargerWhatsappNo() {
		return inchargerWhatsappNo;
	}

	public void setInchargerWhatsappNo(String inchargerWhatsappNo) {
		this.inchargerWhatsappNo = inchargerWhatsappNo;
	}

	public String getInchargerEmailID() {
		return inchargerEmailID;
	}

	public void setInchargerEmailID(String inchargerEmailID) {
		this.inchargerEmailID = inchargerEmailID;
	}

	public String getContactPersonName() {
		return contactPersonName;
	}

	public void setContactPersonName(String contactPersonName) {
		this.contactPersonName = contactPersonName;
	}

	public String getContactPersonContactNo() {
		return contactPersonContactNo;
	}

	public void setContactPersonContactNo(String contactPersonContactNo) {
		this.contactPersonContactNo = contactPersonContactNo;
	}

	public String getContactPersonAlternateContactNo() {
		return contactPersonAlternateContactNo;
	}

	public void setContactPersonAlternateContactNo(String contactPersonAlternateContactNo) {
		this.contactPersonAlternateContactNo = contactPersonAlternateContactNo;
	}

	public String getContactPersonWhatsappNo() {
		return contactPersonWhatsappNo;
	}

	public void setContactPersonWhatsappNo(String contactPersonWhatsappNo) {
		this.contactPersonWhatsappNo = contactPersonWhatsappNo;
	}

	public String getContactPersonEMailID() {
		return contactPersonEMailID;
	}

	public void setContactPersonEMailID(String contactPersonEMailID) {
		this.contactPersonEMailID = contactPersonEMailID;
	}

	public Double getOpeningBalance() {
		return openingBalance;
	}

	public void setOpeningBalance(Double openingBalance) {
		this.openingBalance = openingBalance;
	}

	public Date getOpeningDate() {
		return openingDate;
	}

	public void setOpeningDate(Date openingDate) {
		this.openingDate = openingDate;
	}

	public Double getMinimumAmount() {
		return minimumAmount;
	}

	public void setMinimumAmount(Double minimumAmount) {
		this.minimumAmount = minimumAmount;
	}

	public Double getMaximumAmount() {
		return maximumAmount;
	}

	public void setMaximumAmount(Double maximumAmount) {
		this.maximumAmount = maximumAmount;
	}

	public Double getMonthlyMaximumAmount() {
		return monthlyMaximumAmount;
	}

	public void setMonthlyMaximumAmount(Double monthlyMaximumAmount) {
		this.monthlyMaximumAmount = monthlyMaximumAmount;
	}

	public Double getMaximumUnsettledAmount() {
		return maximumUnsettledAmount;
	}

	public void setMaximumUnsettledAmount(Double maximumUnsettledAmount) {
		this.maximumUnsettledAmount = maximumUnsettledAmount;
	}

	public Date getEffectiveDate() {
		return effectiveDate;
	}

	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	public List<BankDetails> getBankDetails() {
		return bankDetails;
	}

	public void setBankDetails(List<BankDetails> bankDetails) {
		this.bankDetails = bankDetails;
	}

}