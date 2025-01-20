import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Style/EditBranch.css";
import { FiPlusCircle } from "react-icons/fi";
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import API_URL from "../Config";

const EditBranch = () => {
  const navigate = useNavigate();
  const { branchCode } = useParams();

  const [formData, setFormData] = useState({
    branchCode: "",
    branchName: "",
    branchShortName: "",
    doorNo: "",
    street: "",
    pincode: "",
    locality: "",
    city: "",
    state: "",
    panno: "",
    gstin: "",
    branchType: "",
    vehicleType: [],
    branchContactNo: "",
    branchAlternaterContactNo: "",
    branchWhatsappNo: "",
    branchEmailID: "",
    inchargerName: "",
    inchargerContactNo: "",
    inchargeAlternativeContactNo: "",
    inchargerWhatsappNo: "",
    inchargerEmailID: "",
    contactPersonName: "",
    contactPersonContactNo: "",
    contactPersonAlternateContactNo: "",
    contactPersonWhatsappNo: "",
    contactPersonEMailID: "",
    openingBalance: 0,
    openingDate: "",
    minimumAmount: 0,
    maximumAmount: 0,
    monthlyMaximumAmount: 0,
    maximumUnsettledAmount: 0,
    effectiveDate: "",
    status: false,
    bankDetails: [
      {
        accountNumber: "",
        accountHolderName: "",
        ifscCode: "",
        bankName: "",
        branchBankName: "",
      },
    ],
  });

  const allVehicleTypes = ["Car", "Bike", "Truck"];

  useEffect(() => {
    if (branchCode) {
      axios
        .get(`${API_URL}/api/branches/${branchCode}`)
        .then((response) => {
        const fetchedData = response.data;
        setFormData({
          ...fetchedData,
          vehicleType: fetchedData.vehicleType || [],  // Ensures vehicleType is an array
        });
      })
    }
  }, [branchCode]);

  const handleDiscard = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBankDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBankDetails = [...formData.bankDetails];
    updatedBankDetails[index][name] = value;
    setFormData({ ...formData, bankDetails: updatedBankDetails });
  };

  const handleAddBankDetail = () => {
    setFormData({
      ...formData,
      bankDetails: [
        ...formData.bankDetails,
        {
          accountNumber: "",
          accountHolderName: "",
          ifscCode: "",
          bankName: "",
          branchName: "",
        },
      ],
    });
  };

  const handleRemoveBankDetail = (index) => {
    const updatedBankDetails = formData.bankDetails.filter((_, i) => i !== index);
    setFormData({ ...formData, bankDetails: updatedBankDetails });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        vehicleType: [...allVehicleTypes],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        vehicleType: [],
      }));
    }
  };

  const handleVehicleTypeChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedVehicleTypes = checked
        ? [...prev.vehicleType, value]
        : prev.vehicleType.filter((type) => type !== value);
  
      return { ...prev, vehicleType: updatedVehicleTypes };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    axios
      .post(`${API_URL}/api/branches`, formData)
      .then((response) => {
        if (response.status === 200) {
          alert("Branch updated successfully!");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error updating branch:", error);
        alert("Failed to update branch. Please try again.");
      });
  };

  return (
    <section className="edit">
      <form onSubmit={handleSubmit} >
        <h2>Manage Branch</h2>


        {/* Branch Details */}
        <h3>1. Branch Details</h3>


        <div className="form-group">
          <div>
            <label htmlFor="branchCode">Branch Code</label>
            <input type="text" name="branchCode" placeholder="Branch Code" value={formData.branchCode} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="branchName">Branch Name</label>
            <input type="text" name="branchName" placeholder="Branch Name" value={formData.branchName} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <div>
            <label htmlFor="branchShortName">Branch Short Name</label>
            <input type="text" name="branchShortName" placeholder="Branch Short Name" value={formData.branchShortName} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="doorNo">Door/Flat/House No</label>
            <input type="text" name="doorNo" placeholder="Door/Flat/House No" value={formData.doorNo} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <div>
            <label htmlFor="street">Street</label>
            <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
          </div>
          <div >
            <label htmlFor="pincode" >Pincode</label>
            <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <div >
            <label htmlFor="locality">Locality</label>
            <input type="text" name="locality" placeholder="Locality" value={formData.locality} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="city">City</label>
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <div >
            <label htmlFor="state">State</label>
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="panno">PAN No</label>
            <input type="text" name="panno" placeholder="PAN No" value={formData.panno} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <div >
            <label htmlFor="gstin">GSTIN</label>
            <input type="text" name="gstin" placeholder="GSTIN" value={formData.gstin} onChange={handleChange} />
          </div>
          <div >
            <label htmlFor="branchType">Branch Type</label>

            <input type="text" name="branchType" placeholder="Branch Type" value={formData.branchType} onChange={handleChange} required></input>
          </div>
        </div>

        {/* Vehicle Type */}

        <label style={{ color: "gray", fontSize: "14px", marginLeft: "0px", marginTop: "5px" }}> Vehicle Type</label>
        <div style={{ display: "flex", marginTop: "5px" }}>
          <label>
            <input type="checkbox" onChange={handleSelectAll} checked={formData.vehicleType.length === allVehicleTypes.length} />
            Select All
          </label>
          {allVehicleTypes.map((type) => (
            <label key={type} style={{ display: "inline" }}>
              <input type="checkbox" name="vehicleType" value={type} checked={formData.vehicleType.includes(type)} onChange={handleVehicleTypeChange}/>
              {type}
            </label>
          ))}
        </div>

        {/* Branch Contact Details */}

        <h3>2. Branch Contact Details</h3>
        <div className="form-group">
          <div>
            <label htmlFor="branchContactNo">Contact No</label>
            <input type="text" name="branchContactNo" placeholder="Contact No" value={formData.branchContactNo} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="branchAlternaterContactNo">Alternate Contact No</label>
            <input type="text" name="branchAlternaterContactNo" placeholder="Alternate Contact No" value={formData.branchAlternaterContactNo} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <div>
            <label htmlFor="branchWhatsappNo">Whatsapp Number</label>
            <input type="text" name="branchWhatsappNo" placeholder="Whatsapp Number" value={formData.branchWhatsappNo} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="branchEmailID">Email Id</label>
            <input type="email" name="branchEmailID" placeholder="Email Id" value={formData.branchEmailID} onChange={handleChange} required />
          </div>
        </div>

        {/* Branch Incharge Details */}

        <h3>3. Branch Incharge Details</h3>

        <div className="form-group">
          <div >
            <label htmlFor="inchargerName">Branch Incharge Name</label>
            <input type="text" name="inchargerName" placeholder="Branch Incharge Name" value={formData.inchargerName} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="inchargerContactNo">Incharge Contact No</label>

            <input type="text" name="inchargerContactNo" placeholder="Incharge Contact No" value={formData.inchargerContactNo} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <div >
            <label htmlFor="inchargerAlternativeContactNo">Alternative Contact No </label>
            <input type="text" name="inchargerAlternativeContactNo" placeholder="Alternative Contact No" value={formData.inchargeAlternativeContactNo} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="inchargerWhatsappNo">Incharge Whatsapp No</label>
            <input type="text" name="inchargerWhatsappNo" placeholder="Incharge Whatsapp No" value={formData.inchargerWhatsappNo} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-single">
          <label htmlFor="inchargerEmailID">Email Id</label>
          <input type="email" name="inchargerEmailID" placeholder="Email Id" value={formData.inchargerEmailID} onChange={handleChange} required />
        </div>


        {/* Contact Person Details */}


        <h3>4. Contact Person Details</h3>
        <div className="form-group">
          <div >
            <label htmlFor="contactPersonName">Contact Person Name </label>
            <input type="text" name="contactPersonName" placeholder="Contact Person Name" value={formData.contactPersonName} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="contactPersonContactNo" >Contact Person Contact No</label>
            <input type="text" name="contactPersonContactNo" placeholder="Contact Person Contact No" value={formData.contactPersonContactNo} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <div >
            <label htmlFor="contactPersonAlternateContactNo">Alternative Contact No</label>
            <input type="text" name="contactPersonAlternateContactNo" placeholder="Alternative Contact No" value={formData.contactPersonAlternateContactNo} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="contactPersonWhatsappNo">Whatsapp No</label>
            <input type="text" name="contactPersonWhatsappNo" placeholder="Whatsapp No" value={formData.contactPersonWhatsappNo} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-single">
          <label htmlFor="contactPersonEMailID">Email Id</label>
          <input type="email" name="contactPersonEMailID" placeholder="Email Id" value={formData.contactPersonEMailID} onChange={handleChange} required />
        </div>


        {/* Opening Details */}


        <h3>5. Opening Details</h3>
        <div className="form-group">
          <div >
            <label htmlFor="openingBalance">Opening Balance</label>
            <input type="text" name="openingBalance" placeholder="Opening Balance" value={formData.openingBalance} onChange={handleChange} required />
          </div>

          <div >
            <label htmlFor="openingDate">Opening Date</label>
            <input type="date" name="openingDate" value={formData.openingDate} onChange={handleChange} required />
          </div>
        </div>



        {/* Advance Request Details */}


        <h3>6. Advance Request Details</h3>
        <div className="form-group">
          <div>
            <label htmlFor="minimumAmount">Minimum Amount</label>
            <input type="number" name="minimumAmount" placeholder="Minimum Amount" value={formData.minimumAmount} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="maximumAmount">Maximum Amount</label>
            <input type="number" name="maximumAmount" placeholder="Maximum Amount" value={formData.maximumAmount} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <div >
            <label htmlFor="monthlyMaximumAmount">Monthly Maximum Amount</label>
            <input type="number" name="monthlyMaximumAmount" placeholder="Monthly Maximum Amount" value={formData.monthlyMaximumAmount} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="maximumUnsettledAmount">Maximum Unallocated Amount</label>
            <input type="number" name="maximumUnsettledAmount" placeholder="Maximum Unallocated Amount" value={formData.maximumUnsettledAmount} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-single">
          <label htmlFor="effectiveDate">Effective Date</label>
          <input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} required />
        </div>

        {/* Bank Details */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>7. Bank Details</h3>
        </div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="heading" >ACCOUNT NUMBER</th>
              <th className="heading">ACCOUNT HOLDER NAME</th>
              <th className="heading">IFSC CODE</th>
              <th className="heading">BANK NAME</th>
              <th className="heading">BRANCH NAME</th>
              <th className="heading">
                <button type="button" className="btn-add" onClick={handleAddBankDetail}>
                  <FiPlusCircle className="btn-add-1" />
                </button>
              </th>
            </tr>
          </thead>
          {formData.bankDetails.map((bankDetail, index) => (
            <tbody key={index} >
              <tr className="addbank">
                <td>
                  <input type="text" name="accountNumber" placeholder="Account Number" value={bankDetail.accountNumber} onChange={(e) => handleBankDetailChange(index, e)} /></td>
                <td>
                  <input type="text" name="accountHolderName" placeholder="Account Holder Name" value={bankDetail.accountHolderName} onChange={(e) => handleBankDetailChange(index, e)} /></td>
                <td>
                  <input type="text" name="ifscCode" placeholder="IFSC Code" value={bankDetail.ifscCode} onChange={(e) => handleBankDetailChange(index, e)} /></td>
                <td>
                  <input type="text" name="bankName" placeholder="Bank Name" value={bankDetail.bankName} onChange={(e) => handleBankDetailChange(index, e)} /></td>
                <td>
                  <input type="text" name="branchName" placeholder="Branch Name" value={bankDetail.branchName} onChange={(e) => handleBankDetailChange(index, e)} /></td>
                <td>
                  {formData.bankDetails.length > 1 && (
                    <button
                      type="button" className="btn-add"
                      onClick={() => handleRemoveBankDetail(index)}
                      style={{ marginLeft: "10px" }}
                    >
                      <RiDeleteBin6Line className="btn-delete" />
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div>

          {/* Status Toggle */}
          <h3>
            Status:
            <input type="checkbox" name="status" checked={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.checked })} required />
          </h3>

          <button type="button" className="btn-discard" onClick={handleDiscard}>Discard</button>

          <button className="btn-submit" type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default EditBranch;
