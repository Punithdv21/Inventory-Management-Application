import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Adminlogin from './components/Admin/Adminlogin';
import { AdminAuthProvider } from './components/Admin/AdminAuth';
import AdminDashboard from './components/Admin/Admindashboard';
import AdminSiteEngineerManage from './components/Admin/AdminSiteEngineerManage';
import AdminNavbar from './components/Admin/AdminNavbar';
import SiteEngineerDashboard from './components/Site-Engineer/SiteEngineerDashboard';
import InventoryManagement from './components/Site-Engineer/InventoryManagement';
import LaborManagement from './components/Site-Engineer/LaborManagement';
import SiteManagement from './components/Admin/SiteManagment';
import AdminLabourmgnt from './components/Admin/AdminLabourManagment';
import './App.css';
import AdminInventory from './components/Admin/AdminInventory';
import Sidebar from './components/Admin/Sidebar';
import SiteEngineerSidebar from './components/Site-Engineer/SiteEngineerSidebar';
//import EngineerModal from './components/Admin/EngineerModal';

function App() {
    return (
        <AdminAuthProvider>
            <Router>
                <Routes>
                    <Route path="/adminlogin" element={<Adminlogin />} />
                    <Route path="/admindashboard" element={  <AdminDashboard /> } />
                    <Route path="/Adminstaff" element={ <AdminSiteEngineerManage /> } />
                    <Route path="/AdminNavbar" element = { <AdminNavbar/> } />
                    <Route path="/sidebar" element = {<Sidebar />} />
                    <Route path="/home" element = { <SiteEngineerDashboard/>} />
                    <Route path="/site-inventory" element={<InventoryManagement />} />
                    <Route path="/site-labor" element={<LaborManagement />} />
                    <Route path="/Adminsite" element={<SiteManagement/>}/>
                    <Route path="/Admininventory" element={<AdminInventory/>} />
                    <Route path="/Admin-labour" element = { <AdminLabourmgnt/> } />
                    <Route path="site-sidebar" element ={<SiteEngineerSidebar/>} />
                    <Route path="*" element={<Navigate to="/adminlogin" />} />
                </Routes>
            </Router>
        </AdminAuthProvider>
    );
}

export default App;
