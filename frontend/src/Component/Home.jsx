import React, { useEffect, useState } from 'react';
import '../Style/Home.css';
import { IoIosAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { MdOutlineUpload, MdOutlineWidgets, MdOutlineZoomOutMap } from "react-icons/md";
import { ImDownload3 } from "react-icons/im";
import { Link } from "react-router-dom";
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function Home() {
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [rowsToShow, setRowsToShow] = useState(2);


  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleRowsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRowsToShow(isNaN(value) ? 0 : value);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/getBranch")
      .then((res) => {
        console.log(res.data);
        setBranches(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching branches:", err);
        setBranches([]);
      });
  }, []);

  const downloadExcel = () => {
    const data = branches.map((branch, index) => ({
      "#": index + 1,
      "Branch Code": branch.branchCode,
      "Branch Name": branch.branchName,
      "Branch Short Name": branch.branchShortName,
      "Door No": branch.doorNo,
      "Street": branch.street,
      "Pincode": branch.pincode,
      "Locality": branch.locality,
      "City": branch.city,
      "State": branch.state,
      "PAN No": branch.panno,
      "GSTIN": branch.gstin,
      "Branch Type": branch.branchType,
      "Vehicle Type": branch.vehicleType.join(", "),
      "Branch Contact No": branch.branchContactNo,
      "Branch Alternater Contact No": branch.branchAlternaterContactNo,
      "Branch Whatsapp No": branch.branchWhatsappNo,
      "Branch Email ID": branch.branchEmailID,
      "Incharger Name": branch.inchargerName,
      "Incharger Contact No": branch.inchargerContactNo,
      "Incharger Alternate Contact No": branch.inchargerAlternateContactNo,
      "Incharger Whatsapp No": branch.inchargerWhatsappNo,
      "Incharger Email ID": branch.inchargerEmailID,
      "Contact Person Name": branch.contactPersonName,
      "Contact Person Phone No": branch.contactPersonContactNo,
      "Contact Person Alternate No": branch.contactPersonAlternateContactNo,
      "Contact Person Whatsapp No": branch.contactPersonAlternateContactNo,
      "Contact Person Email ID": branch.contactPersonAlternateContactNo,
      "Opening Balance": branch.openingBalance,
      "Opening Date": branch.openingDate,
      "Minimum Amount": branch.minimumAmount,
      "Maximum Amount": branch.maximumAmount,
      "Monthly Maximum Amount": branch.monthlyMaximumAmount,
      "Maximum Unsettled Amount": branch.maximumUnsettledAmount,
      "Effective Date": branch.effectiveDate,
      "Bank Details": branch.bankDetails.map(bank => `Account No: ${bank.accountNumber},Account Holder Name: ${bank.accountHolderName}, IFSC: ${bank.ifscCode}, Bank Name: ${bank.bankName},Branch Name: ${bank.branchName}`).join(" | ")
    }));


    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Branches");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Branches.xlsx");
  };

  const changeScreen = () => {
    setIsFullScreen(prevState => !prevState);
  };

  return (
    <section>
      <div className={`container ${isFullScreen ? 'fullscreen' : 'medium-screen'}`}>
        <div className='box-title'>
          <h1>Branch</h1>
        </div>
        <div className='icons'>
          <div className='icon-section'>
            <Link to={'/addbranch'} title="Add Branch">
              <IoIosAddCircle className="icon add-icon" />
            </Link>
            <FaSearch className="icon search-icon" />
            <input
              type='text'
              placeholder='Search.....'
              value={search}
              style={{ width: "400px", marginLeft: "-5px" }}
              onChange={handleChange}
            />
          </div>
          <div className='icon-section'>

            {/* Import not Work */}
            <div>
              <MdOutlineUpload className="icon" />
            </div>

            {/* To Download excel */}
            <div onClick={downloadExcel}>
              <ImDownload3 className="icon" />
            </div>

            {/* Widget Not Work */}
            <div>
              <MdOutlineWidgets className="icon" />
            </div>

            {/* For Screen Size change */}
            <div onClick={changeScreen} >
              <MdOutlineZoomOutMap className="icon" />
            </div>
          </div>
        </div>
        <div className='branch-table-wrapper'>
          <table className='branch-table' border={"1"}>
            <thead>
              <tr className='tr'>
                <th className='fixed-column'>#</th>
                <th className='fixed-column'>Branch Name</th>
                <th>Branch Code</th>
                <th>Branch Short Name</th>
                <th>Locality</th>
                <th>City</th>
                <th>State</th>
                <th>Contact Person</th>
                <th>Contact Number</th>
                <th>PAN No</th>
                <th>GSTIN</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {branches.length > 0 ? (
                branches
                  .filter(branch => {
                    return (
                      branch.branchName?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.panno?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.gstin?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.branchCode?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.city?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.state?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.contactPersonName?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.locality?.toLowerCase().includes(search.toLowerCase())
                    );
                  })
                  .slice(0, rowsToShow)
                  .map((branch, index) => (
                    <tr key={branch.id}>
                      <td className='fixed-column'>{index + 1}</td>
                      <td className='fixed-column'>{branch.branchName}</td>
                      <td>{branch.branchCode}</td>
                      <td>{branch.branchShortName}</td>
                      <td>{branch.locality}</td>
                      <td>{branch.city}</td>
                      <td>{branch.state}</td>
                      <td>{branch.contactPersonName}</td>
                      <td>{branch.contactPersonContactNo}</td>
                      <td>{branch.panno}</td>
                      <td>{branch.gstin}</td>
                      <td>
                        <p className='status-active'>Active</p>
                      </td>
                      <td className='action'>
                        <Link to={`/editBranch/${branch.branchCode}`}>
                          <MdEdit style={{ color: "rgb(80, 80, 80)", fontSize: "20px", margin: "2px 16px" }} />
                        </Link>
                        <Link to={`/viewBranch/${branch.branchCode}`}>
                          <MdRemoveRedEye style={{ color: "rgb(80, 80, 80)", fontSize: "20px", margin: "2px 16px" }} />
                        </Link>
                        <Link to={`/history/${branch.branchCode}`}>
                          <MdHistory style={{ color: "rgb(80, 80, 80)", fontSize: "20px", margin: "2px 16px" }} />
                        </Link>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="13" style={{ textAlign: 'center' }}>
                    No branches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="no-row" style={{ margin: '10px 0' }}>
          <label htmlFor="rows-to-show">Number of rows to display: </label>
          <input
            type="number"
            id="rows-to-show"
            value={rowsToShow}
            onChange={handleRowsChange}
            style={{ width: '70px', marginLeft: '10px' }}
          />
        </div>
      </div>
    </section>
  );
}

export default Home;

