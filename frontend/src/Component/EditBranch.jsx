import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Style/AddBranch.css";
import { FiPlusCircle } from "react-icons/fi";
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";

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
        .get(`http://localhost:8080/api/editBranch/${branchCode}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching branch data:", error);
        });
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
          branchBankName: "",
        },
      ],
    });
  };

  const handleRemoveBankDetail = (index) => {
    const updatedBankDetails = formData.bankDetails.filter((_, i) => i !== index);
    setFormData({ ...formData, bankDetails: updatedBankDetails });
  };

  const handleSelectAll = () => {
    const isAllSelected = formData.vehicleType.length === allVehicleTypes.length;
    setFormData({
      ...formData,
      vehicleType: isAllSelected ? [] : allVehicleTypes,
    });
  };

  const handleVehicleTypeChange = (type) => {
    const isSelected = formData.vehicleType.includes(type);
    const updatedVehicleTypes = isSelected
      ? formData.vehicleType.filter((t) => t !== type)
      : [...formData.vehicleType, type];
    setFormData({ ...formData, vehicleType: updatedVehicleTypes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/addBranch`, formData)
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
    <form onSubmit={handleSubmit}>
      <h2>Manage Branch</h2>


      {/* Branch Details */}
      <h3>1. Branch Details</h3>

      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Branch Code</label>
          <input type="text" style={{ width: "560px" }} name="branchCode" placeholder="Branch Code" value={formData.branchCode} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Branch Name</label>
          <input type="text" name="branchName" style={{ width: "560px" }} placeholder="Branch Name" value={formData.branchName} onChange={handleChange} required />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Branch Short Name</label>

          <input type="text" style={{ width: "560px" }} name="branchShortName" placeholder="Branch Short Name" value={formData.branchShortName} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Door/Flat/House No</label>

          <input type="text" name="doorNo" style={{ width: "560px" }} placeholder="Door/Flat/House No" value={formData.doorNo} onChange={handleChange} />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Street</label>

          <input type="text" name="street" style={{ width: "560px" }} placeholder="Street" value={formData.street} onChange={handleChange} />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Pincode</label>

          <input type="text" name="pincode" style={{ width: "560px" }} placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Locality</label>

          <input type="text" name="locality" style={{ width: "560px" }} placeholder="Locality" value={formData.locality} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>City</label>

          <input type="text" name="city" style={{ width: "560px" }} placeholder="City" value={formData.city} onChange={handleChange} required />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>State</label>


          <input type="text" name="state" style={{ width: "560px" }} placeholder="State" value={formData.state} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>PAN No</label>

          <input type="text" name="panno" style={{ width: "560px" }} placeholder="PAN No" value={formData.panno} onChange={handleChange} />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>GSTIN</label>

          <input type="text" name="gstin" style={{ width: "560px" }} placeholder="GSTIN" value={formData.gstin} onChange={handleChange} />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Branch Type</label>

          <input type="text" name="branchType" style={{ width: "560px" }} placeholder="Branch Type" value={formData.branchType} onChange={handleChange} required>
          </input>
        </div>
      </div>

      {/* Vehicle Type */}
      <h5 style={{ color: "gray", fontSize: "15px", marginLeft: "13px", marginTop: "5px" }}> Vehicle Type</h5>
      <div style={{ display: "flex" }}>      <label style={{ color: "gray", fontSize: "15px" }}>
        <input type="checkbox" onChange={handleSelectAll} checked={formData.vehicleType.length === allVehicleTypes.length} />
        Select All
      </label>
        {allVehicleTypes.map((type) => (
          <label key={type} style={{ color: "gray", fontSize: "15px", display: "inline" }}>
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
      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Contact No</label>

          <input type="text" name="branchContactNo" style={{ width: "560px" }} placeholder="Contact No" value={formData.branchContactNo} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Alternate Contact No</label>
          <input type="text" name="branchAlternaterContactNo" style={{ width: "560px" }} placeholder="Alternate Contact No" value={formData.branchAlternaterContactNo} onChange={handleChange} required />
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Whatsapp Number</label>

          <input type="text" name="branchWhatsappNo" style={{ width: "560px" }} placeholder="Whatsapp Number" value={formData.branchWhatsappNo} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Email Id</label>

          <input type="email" name="branchEmailID" style={{ width: "560px" }} placeholder="Email Id" value={formData.branchEmailID} onChange={handleChange} required />
        </div>
      </div>
      {/* Branch Incharge Details */}
      <h3>3. Branch Incharge Details</h3>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Branch Incharge Name</label>
          <input type="text" name="inchargerName" style={{ width: "560px" }} placeholder="Branch Incharge Name" value={formData.inchargerName} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Incharge Contact No</label>

          <input type="text" name="inchargerContactNo" style={{ width: "560px" }} placeholder="Incharge Contact No" value={formData.inchargerContactNo} onChange={handleChange} required />
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Alternative Contact No </label>

          <input type="text" name="inchargerAlternativeContactNo" style={{ width: "560px" }} placeholder="Alternative Contact No" value={formData.inchargeAlternativeContactNo} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Incharge Whatsapp No</label>

          <input type="text" name="inchargerWhatsappNo" style={{ width: "560px" }} placeholder="Incharge Whatsapp No" value={formData.inchargerWhatsappNo} onChange={handleChange} required />
        </div>
      </div>
      <div>
        <label style={{ color: "gray", fontSize: "13px", marginBottom: "-5px" }}>Email Id</label>
        <input type="email" name="inchargerEmailID" style={{ width: "560px" }} placeholder="Email Id" value={formData.inchargerEmailID} onChange={handleChange} required />
      </div>


      {/* Contact Person Details */}


      <h3>4. Contact Person Details</h3>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Contact Person Name </label>
          <input type="text" name="contactPersonName" style={{ width: "560px" }} placeholder="Contact Person Name" value={formData.contactPersonName} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Contact Person Contact No</label>
          <input type="text" name="contactPersonContactNo" style={{ width: "560px" }} placeholder="Contact Person Contact No" value={formData.contactPersonContactNo} onChange={handleChange} required />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Alternative Contact No</label>
          <input type="text" name="contactPersonAlternateContactNo" style={{ width: "560px" }} placeholder="Alternative Contact No" value={formData.contactPersonAlternateContactNo} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Whatsapp No</label>
          <input type="text" name="contactPersonWhatsappNo" style={{ width: "560px" }} placeholder="Whatsapp No" value={formData.contactPersonWhatsappNo} onChange={handleChange} required />
        </div>
      </div>

      <div>
        <label style={{ color: "gray", fontSize: "13px", marginBottom: "-5px" }}>Email Id</label>
        <input type="email" name="contactPersonEMailID" style={{ width: "560px" }} placeholder="Email Id" value={formData.contactPersonEMailID} onChange={handleChange} required />
      </div>


      {/* Opening Details */}


      <h3>5. Opening Details</h3>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Opening Balance</label>
          <input type="text" style={{ width: "97%" }} name="openingBalance" placeholder="Opening Balance" value={formData.openingBalance} onChange={handleChange} required />
        </div>

        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Opening Date</label>
          <input type="date" name="openingDate" style={{ width: "560px" }} value={formData.openingDate} onChange={handleChange} required />
        </div>
      </div>



      {/* Section 6: Advance Request Details */}


      <h3>6. Advance Request Details</h3>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Minimum Amount</label>
          <input type="number" name="minimumAmount" style={{ width: "560px" }} placeholder="Minimum Amount" value={formData.minimumAmount} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Maximum Amount</label>
          <input type="number" name="maximumAmount" style={{ width: "560px" }} placeholder="Maximum Amount" value={formData.maximumAmount} onChange={handleChange} required />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Monthly Maximum Amount</label>
          <input type="number" name="monthlyMaximumAmount" style={{ width: "560px" }} placeholder="Monthly Maximum Amount" value={formData.monthlyMaximumAmount} onChange={handleChange} required />
        </div>
        <div >
          <label style={{ color: "gray", fontSize: "13px", marginTop: "-10px", marginBottom: "-5px" }}>Maximum Unallocated Amount</label>
          <input type="number" name="maximumUnsettledAmount" style={{ width: "560px" }} placeholder="Maximum Unallocated Amount" value={formData.maximumUnsettledAmount} onChange={handleChange} required />
        </div>
      </div>

      <div>
        <label style={{ color: "gray", fontSize: "13px", marginBottom: "-5px" }}>Effective Date</label>
        <input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} required />
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

      <div style={{ display: "flex", float: "right" }}>

        {/* Status Toggle */}
        <label style={{ marginTop: "21px", marginRight: "20px" }}>
          Status:
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.checked })} required
          />
        </label>
   
        <button type="button" className="btn-discard" onClick={handleDiscard}>Discard</button>

        <button className="btn-submit" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default EditBranch;