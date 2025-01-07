import React, { useEffect, useState } from 'react';
import '../Style/ViewBranch.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewBranch() {

    const { branchCode } = useParams();
    const [branch, setBranch] = useState([]);
    console.log(branchCode);
    useEffect(() => {
        if (branchCode) {
            axios.get(`http://localhost:8080/api/viewBranch/${branchCode}`)
                .then((response) => {
                    setBranch(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching branch data:', error);
                });
        }
    }, [branchCode]);

    return (
        <>
            <main>
                <div className='view-section'>
                    <h2>Branch View</h2>
                    <div className='branch-details'>
                        <h3>1.Branch Details</h3>
                        <table>
                            <tr>
                                <th>Branch Name :</th>
                                <td>{branch.branchName}</td>
                                <th>Branch Code :</th>
                                <td>{branch.branchCode}</td>
                            </tr>
                            <tr>
                                <th>Shot Name :</th>
                                <td>{branch.branchShortName}</td>
                                <th>Door No :</th>
                                <td>{branch.doorNo}</td>
                            </tr>
                            <tr>
                                <th>Street : </th>
                                <td>{branch.street}</td>
                                <th>Locality : </th>
                                <td>{branch.locality}</td>
                            </tr>
                            <tr>
                                <th>City :</th>
                                <td>{branch.city}</td>
                                <th>State :</th>
                                <td>{branch.state}</td>
                            </tr>
                            <tr>
                                <th>PinCode :</th>
                                <td>{branch.pincode}</td>
                                <th>PAN No :</th>
                                <td>{branch.panno}</td>
                            </tr>
                            <tr>
                                <th>GSTIN : </th>
                                <td>{branch.gstin}</td>
                                <th>Branch Type : </th>
                                <td>{branch.branchType}</td>
                            </tr>
                        </table>
                        <hr />
                        <h3>2.Branch Contact Details</h3>
                        <table>
                            <tr>
                                <th>Contact No : </th>
                                <td>{branch.branchContactNo}</td>
                                <th>Alternate No : </th>
                                <td>{branch.branchAlternaterContactNo}</td>
                            </tr>
                            <tr>
                                <th>Whatsapp No : </th>
                                <td>{branch.branchWhatsappNo}</td>
                                <th>Email-ID : </th>
                                <td>{branch.branchEmailID}</td>
                            </tr>
                        </table>
                        <hr />
                        <h3>3.Branch Incharge Details</h3>
                        <table>
                            <tr>
                                <th>Incharge Name : </th>
                                <td>{branch.inchargerName}</td>
                                <th>Contact No : </th>
                                <td>{branch.inchargerContactNo}</td>
                            </tr>
                            <tr>
                                <th>Alternate No : </th>
                                <td>{branch.branchAlternaterContactNo}</td>
                                <th>Whatsapp No : </th>
                                <td>{branch.inchargerWhatsappNo}</td>
                            </tr>
                            <tr>
                                <th>Email-ID : </th>
                                <td>{branch.inchargerEmailID}</td>
                            </tr>

                        </table>

                        <hr />

                        <h3>4.Contact Person Details</h3>
                        <table>
                            <tr>
                                <th>Contact Person Name : </th>
                                <td>{branch.contactPersonName}</td>
                                <th>Contact No : </th>
                                <td>{branch.contactPersonContactNo}</td>
                            </tr>
                            <tr>
                                <th>Alternate No : </th>
                                <td>{branch.contactPersonAlternateContactNo}</td>
                                <th>Whatsapp No : </th>
                                <td>{branch.contactPersonWhatsappNo}</td>
                            </tr>
                            <tr>
                                <th>Email-ID : </th>
                                <td>{branch.contactPersonEMailID}</td>
                            </tr>
                        </table>

                        <hr />

                        <h3>5.Opening Details</h3>
                        <table>
                            <tr>
                                <th>Date : </th>
                                <td>{branch.openingDate}</td>
                                <th>Amount : </th>
                                <td>{branch.openingBalance}</td>
                            </tr>

                        </table>

                        <hr />

                        <h3>6.Advance Request Details</h3>
                        <table>
                            <tr>
                                <th>Minimum Amount : </th>
                                <td>{branch.minimumAmount}</td>
                                <th>Maximum Amount : </th>
                                <td>{branch.maximumAmount}</td>
                            </tr>
                            <tr>
                                <th>Monthly Max Amount : </th>
                                <td>{branch.monthlyMaximumAmount}</td>
                                <th>Max Unsettled Amount : </th>
                                <td>{branch.maximumUnsettledAmount}</td>
                            </tr>
                            <tr>
                                <th>Effective Date : </th>
                                <td>{branch.effectiveDate}</td>

                            </tr>

                        </table>
                        <hr />

                        <h3>7.Bank Details</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Account Number</th>
                                    <th>Account Holder Name</th>
                                    <th>IFSC Code</th>
                                    <th>Bank Name</th>
                                    <th>Branch Name</th>
                                </tr>
                            </thead>

                            <tbody>
                                {(branch.bankDetails || []).map((bank, index) => (
                                    <tr key={index}>
                                        <td>{bank.accountNumber}</td>
                                        <td>{bank.accountHolderName}</td>
                                        <td>{bank.ifscCode}</td>
                                        <td>{bank.bankName}</td>
                                        <td>{bank.branchName}</td>
                                    </tr>
                                ))}

                            </tbody>


                        </table>

                        <Link to="/"><button className='cancel'>
                            Close

                        </button>
                        </Link>
                    </div>
                </div>

            </main>

        </>
    )
}