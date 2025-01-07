import React from 'react';
import "../Style/Navbar.css";
import image from "../Img/img1.jpg";
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import EditBranch from './EditBranch';
import AddBranch from './AddBranch';
import History from './History';
import ViewBranch from './ViewBranch';


function Navbar() {
    return (
        <section>
            <div className="nav">
                <div className='nav-title'>
                    <h1>BRANCH MANAGEMENT SYSTEM</h1>
                </div>
                <div className='nav-img'>
                    <img src={image} alt=''></img>
                    <h3 className="user">Senthil Nathan</h3>
                </div>
            </div>
            <hr></hr>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/addbranch' element={<AddBranch />}></Route>
                <Route path='/editbranch/:branchCode' element={<EditBranch />}></Route>
                <Route path='/viewbranch/:branchCode' element={<ViewBranch />}></Route>
                <Route path='/history/:branchCode' element={<History />}></Route>
            </Routes>
        </section>
    )
}

export default Navbar