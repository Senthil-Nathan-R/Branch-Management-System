
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AddBranch.css";
import { FiPlusCircle } from "react-icons/fi";
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";

const AddBranch = () => {
  const navigate = useNavigate(); 
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
    inchargerAlternateContactNo: "",
    inchargerWhatsappNo: "",
    inchargerEmailID: "",
    contactPersonName: "",
    contactPersonContactNo: "",
    contactPersonAlternateContactNo: "",
    contactPersonWhatsappNo: "",
    contactPersonEMailID: "",
    openingBalance: "",
    openingDate: "",
    minimumAmount: "",
    maximumAmount: "",
    monthlyMaximumAmount: "",
    maximumUnsettledAmount: "",
    effectiveDate: "",
    status: true,
    bankDetails: [
      {
        accountNumber: "",
        accountHolderName: "",
        ifscCode: "",
        bankName: "",
        branchName: "",
      },
    ],
  });


  const handleDiscard = () => {
    setFormData({
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
      inchargerAlternateContactNo: "",
      inchargerWhatsappNo: "",
      inchargerEmailID: "",
      contactPersonName: "",
      contactPersonContactNo: "",
      contactPersonAlternateContactNo: "",
      contactPersonAlternateContactNo: "",
      contactPersonAlternateContactNo: "",
      openingBalance: "",
      openingDate: "",
      minimumAmount: "",
      maximumAmount: "",
      monthlyMaximumAmount: "",
      maximumUnsettledAmount: "",
      effectiveDate: "",
      status: true,
      bankDetails: [
        {
          accountNumber: "",
          accountHolderName: "",
          ifscCode: "",
          bankName: "",
          branchName: "",
        },
      ],
    });

    // Navigate to the home page or any other page
    navigate("/");
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "number" ? Number(value) : value;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    axios.post("http://localhost:8080/api/addBranch",formData)
        .then(res=>{
          if(res.data==="success" || 201){
            alert(
                "Your Account has been Registered Successfully!!! "
            )
            navigate("/");
        }})
  };

  const handleSelectAll = () => {
    setFormData({
      ...formData,
      vehicleType: allVehicleTypes, 
    });
  };

  const allVehicleTypes = ["Car", "Bike", "Truck"]; 

  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Manage Branch</h2>

      
       {/* Branch Details */}
       <h3>1. Branch Details</h3>
       <input type="text" name="branchCode" placeholder="Branch Code" value={formData.branchCode} onChange={handleChange} required />
       <input type="text" name="branchName" placeholder="Branch Name" value={formData.branchName} onChange={handleChange} required />
       <input type="text" name="branchShortName" placeholder="Branch Short Name" value={formData.branchShortName} onChange={handleChange} required />
       <input type="text" name="doorNo" placeholder="Door/Flat/House No" value={formData.doorNo} onChange={handleChange} />
       <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
       <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
       <input type="text" name="locality" placeholder="Locality" value={formData.locality} onChange={handleChange} required />
       <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
       <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
       <input type="text" name="panno" placeholder="PAN No" value={formData.panno} onChange={handleChange} />
       <input type="text" name="gstin" placeholder="GSTIN" value={formData.gstin} onChange={handleChange} />
       <input type="text" name="branchType" placeholder="Branch Type" value={formData.branchType} onChange={handleChange} required>
       </input>

       {/* Vehicle Type */}
       <h5 style={{color:"gray",fontSize:"17px",marginLeft:"13px",marginTop:"5px"}}> Vehicle Type</h5>
       <div style={{display:"flex"}}>      <label style={{color:"gray",fontSize:"15px"}}>
         <input type="checkbox"  onChange={handleSelectAll} checked={formData.vehicleType.length === allVehicleTypes.length} />
          Select All
       </label>
       {allVehicleTypes.map((type) => (
        <label key={type} style={{color:"gray" , fontSize:"15px" , display:"inline"}}>
          <input
            type="checkbox"
            name="vehicleType"
            value={type}
      checked={formData.vehicleType.includes(type)}

            onChange={(e) => {
              const { value, checked } = e.target;
              const updatedVehicleTypes = checked
                ? [...formData.vehicleType, value]
                : formData.vehicleType.filter((t) => t !== value);
              setFormData({ ...formData, vehicleType: updatedVehicleTypes });
            }}
          />
           {type}
        </label>
      ))}
      </div>

      

      {/* Branch Contact Details */}
      
      <h3>2. Branch Contact Details</h3>
      <input type="text" name="branchContactNo" placeholder="Contact No" value={formData.branchContactNo} onChange={handleChange} required/>
      <input type="text" name="branchAlternaterContactNo" placeholder="Alternate Contact No" value={formData.branchAlternaterContactNo} onChange={handleChange} required/>
      <input type="text" name="branchWhatsappNo" placeholder="Whatsapp Number" value={formData.branchWhatsappNo} onChange={handleChange} required/>
      <input type="email" name="branchEmailID" placeholder="Email Id" value={formData.branchEmailID} onChange={handleChange} required/>

      {/* Branch Incharge Details */}
      
      <h3>3. Branch Incharge Details</h3>
      <input type="text" name="inchargerName" placeholder="Branch Incharge Name" value={formData.inchargerName} onChange={handleChange} required/>
      <input type="text" name="inchargerContactNo" placeholder="Incharge Contact No" value={formData.inchargerContactNo} onChange={handleChange} required/>
      <input type="text" name="inchargerAlternativeContactNo" placeholder="Alternative Contact No" value={formData.inchargeAlternativeContactNo} onChange={handleChange} required/>
      <input type="text" name="inchargerWhatsappNo" placeholder="Incharge Whatsapp No" value={formData.inchargerWhatsappNo} onChange={handleChange} required/>
      <input type="email" name="inchargerEmailID" placeholder="Email Id" value={formData.inchargerEmailID} onChange={handleChange} required/>

      {/* Contact Person Details */}
      
      <h3>4. Contact Person Details</h3>
      <input type="text" name="contactPersonName" placeholder="Contact Person Name" value={formData.contactPersonName} onChange={handleChange} required/>
      <input type="text" name="contactPersonContactNo" placeholder="Contact Person Contact No" value={formData.contactPersonContactNo} onChange={handleChange} required/>
      <input type="text" name="contactPersonAlternateContactNo" placeholder="Alternative Contact No" value={formData.contactPersonAlternateContactNo} onChange={handleChange} required/>
      <input type="text" name="contactPersonWhatsappNo" placeholder="Whatsapp No" value={formData.contactPersonWhatsappNo} onChange={handleChange} required/>
      <input type="email" name="contactPersonEMailID" placeholder="Email Id" value={formData.contactPersonEMailID} onChange={handleChange} required/>

        {/* Opening Details */}
    
        <h3>5. Opening Details</h3>
        <div style={{display:"flex"}}>
           <div style={{width:"50%"}}>
          <input type="text" style={{width:"560px"}} name="openingBalance" placeholder="Opening Balance" value={formData.openingBalance}  onChange={handleChange} required/>
          </div>
          <div >
          <label style={{color:"gray",fontSize:"13px",marginTop:"-10px",marginBottom:"-5px"}}>Opening Date</label>
          <input type="date" name="openingDate" style={{width:"560px"}}  value={formData.openingDate} onChange={handleChange} required />   
          </div>
          </div>

      {/* Section 6: Advance Request Details */}
      
        <h3>6. Advance Request Details</h3>
        
          <input type="number" name="minimumAmount" placeholder="Minimum Amount" value={formData.minimumAmount} onChange={handleChange} required/>
          <input type="number" name="maximumAmount" placeholder="Maximum Amount"value={formData.maximumAmount} onChange={handleChange} required/>
          <input type="number" name="monthlyMaximumAmount" placeholder="Monthly Maximum Amount" value={formData.monthlyMaximumAmount} onChange={handleChange} required/>
          <input type="number" name="maximumUnsettledAmount" placeholder="Maximum Unallocated Amount"  value={formData.maximumUnsettledAmount} onChange={handleChange} required/>
         <div>
          <label style={{color:"gray",fontSize:"13px",marginBottom:"-5px"}}>Effective Date</label>
          <input type="date" name="effectiveDate"  value={formData.effectiveDate} onChange={handleChange} required/>
         </div>
          

      <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>7. Bank Details</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="heading" >ACCOUNT NUMBER</th>
                  <th className="heading">ACCOUNT HOLDER NAME</th>
                  <th className="heading">IFSC CODE</th>
                  <th className="heading">BANK NAME</th>
                  <th className="heading">BRANCH NAME</th>
                  <th className="heading">
                    <button type="button" className="btn-add" onClick={handleAddBankDetail}>
                      <FiPlusCircle style={{ color: "rgb(4, 184, 255)", fontWeight: "bold", fontSize: "30px", cursor: "pointer" }} />
                    </button>
                  </th>
                </tr>
              </thead>
              {formData.bankDetails.map((bankDetail, index) => (
                <tbody key={index} style={{ marginBottom: "20px" }}>
                  <tr className="addbank">
                    <td>
                      <input type="text" name="accountNumber" placeholder="Account Number" value={bankDetail.accountNumber} onChange={(e) => handleBankDetailChange(index, e)} /></td>
                    <td>
                      <input type="text" name="accountHolderName" placeholder="Account Holder Name" value={bankDetail.accountHolderName} onChange={(e) => handleBankDetailChange(index, e)}/></td>
                    <td>
                      <input type="text" name="ifscCode" placeholder="IFSC Code"  value={bankDetail.ifscCode} onChange={(e) => handleBankDetailChange(index, e)}/></td>
                    <td>
                      <input type="text" name="bankName" placeholder="Bank Name" value={bankDetail.bankName}  onChange={(e) => handleBankDetailChange(index, e)}  /></td>
                    <td>
                      <input type="text" name="branchName" placeholder="Branch Name" value={bankDetail.branchName}  onChange={(e) => handleBankDetailChange(index, e)} /></td>
                    <td>
                      {formData.bankDetails.length > 1 && (
                        <button
                          type="button" className="btn-add"
                          onClick={() => handleRemoveBankDetail(index)}
                          style={{ marginLeft: "10px" }}
                        >
                          <RiDeleteBin6Line style={{ color: "red", fontSize: "25px", marginTop: "-15px ", marginLeft: "60px" }} />
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <br />

      <div style={{display:"flex",float:"right"}}>

             {/* Status Toggle */}
       <label style={{marginTop:"21px",marginRight:"20px"}}>
        Status:
         <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.checked })} required
        />
      </label>

      {/* Buttons */}
      <button type="button" className="btn-discard" onClick={handleDiscard}>Discard</button>
        
      

      <button className="btn-submit" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddBranch;