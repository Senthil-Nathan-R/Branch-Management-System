import React, { useEffect, useState } from 'react';
import '../Style/History.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function History() {

    const { branchCode } = useParams();
    const [branchData, setBranchData] = useState({});


    useEffect(() => {
        axios.get(`http://localhost:8080/api/history/${branchCode}`)
            .then((response) => {
                setBranchData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching branch data:', error);
            });
    }, [branchCode]);


    return (
        <section>
            <div className='history-section'>
                <h2>Branch History Limit</h2>
                <div className='branch-details'>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Effective Date</th>
                                <th>Opening Balance</th>
                                <th>Minimum Amount</th>
                                <th>Maximum Amount</th>
                                <th>Monthly Max Amount</th>
                                <th>Max Unsettled Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>{branchData.effectiveDate}</td>
                                <td>{branchData.openingBalance}</td>
                                <td>{branchData.minimumAmount}</td>
                                <td>{branchData.maximumAmount}</td>
                                <td>{branchData.monthlyMaximumAmount}</td>
                                <td>{branchData.maximumUnsettledAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/"><button className='cancel' style={{ marginTop: "250px" }}>Close</button></Link>
                </div>
            </div>
        </section>
    )
}