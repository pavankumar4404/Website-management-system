import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import HomeDocument from './pages/HomeDocument';
import CreateWebsiteDocument from './pages/CreateWebsiteDocument';
import HomeTeam from './pages/HomeTeam';
import CreateWebsiteTeam from './pages/CreateWebsiteTeam';


import AddTeams from '../../frontendTeam/src/pages/AddTeams'
import TeamHome from '../../frontendTeam/src/pages/Home';
import EditTeam from '../../frontendTeam/src/pages/EditTeam';
import DeleteTeam from '../../frontendTeam/src/pages/DeleteTeam';


import EmployeeHome from '../../frontendEmp/src/pages/Home';
import AddEmployees from '../../frontendEmp/src/pages/AddEmployees';
import EditEmployee from '../../frontendEmp/src/pages/EditEmployee';
import DeleteEmployee from '../../frontendEmp/src/pages/DeleteEmployee';


import EmailHome from '../../frontendEmailMaster/src/pages/Home';
import AddEmails from '../../frontendEmailMaster/src/pages/AddEmails';
import EditEmail from '../../frontendEmailMaster/src/pages/EditEmail';
import DeleteEmail from '../../frontendEmailMaster/src/pages/DeleteEmail';


import ActionHome from "../../frontendAction/src/pages/Home";
import AddVulnerability from "../../frontendAction/src/pages/AddVulnerability";
import EditVulnerability from "../../frontendAction/src/pages/EditVulnerability";
import VulnerabilityAction from "../../frontendAction/src/pages/VulnerabilityAction";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/books' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:website_id' element={<ShowBook />} />
      <Route path='/books/edit/:website_id' element={<EditBook />} />
      <Route path='/books/delete/:website_id' element={<DeleteBook />} />
      <Route path='/books1' element={<HomeDocument />} />
      <Route path='/books/createDocument' element={<CreateWebsiteDocument />} />
      <Route path='/books2' element={<HomeTeam />} />
      <Route path='/books/createTeam' element={<CreateWebsiteTeam />} />


      {/* /Routes for Team Managemnet(team table in sql) */}
      <Route path='/teams' element={<TeamHome />} />
      <Route path='/teams/create' element={<AddTeams />} />
      <Route path='/teams/edit/:emp_id' element={<EditTeam />} />
      <Route path='/teams/delete/:emp_id' element={<DeleteTeam />} />

      
{/* Routes for Employee Management(employee table from sql) */}
      <Route path='/employees' element={<EmployeeHome />} />
      <Route path='/employees/create' element={<AddEmployees />} />
      <Route path='/employees/edit/:emp_id' element={<EditEmployee />} />
      <Route path='/employees/delete/:emp_id' element={<DeleteEmployee />} />



      <Route path='/emails' element={<EmailHome />} />
      <Route path='/emails/create' element={<AddEmails />} />
      <Route path='/emails/edit/:email_id' element={<EditEmail />} />
      <Route path='/emails/delete/:email_id' element={<DeleteEmail />} />


      <Route path="/vulnerabilities" element={<ActionHome />} />
      <Route path="/vulnerabilities/create" element={<AddVulnerability />} />
      <Route path="/vulnerabilities/edit/:id" element={<EditVulnerability />} />
      <Route path="/vulnerabilities/action/:id" element={<VulnerabilityAction />} />


    </Routes>
  );
};

export default App;

