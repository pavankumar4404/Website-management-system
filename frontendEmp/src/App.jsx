import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeHome from './pages/Home';
import AddEmployees from './pages/AddEmployees';
import ShowEmployee from './pages/ShowEmployee';
import EditEmployee from './pages/EditEmployee';
import DeleteEmployee from './pages/DeleteEmployee';

const App = () => {
  return (
    <Routes>
      <Route path='/employees' element={<EmployeeHome />} />
      <Route path='/employees/create' element={<AddEmployees />} />
      <Route path='/employees/details/:emp_id' element={<ShowEmployee />} />
      <Route path='/employees/edit/:emp_id' element={<EditEmployee />} />
      <Route path='/employees/delete/:emp_id' element={<DeleteEmployee />} />
      {/* <Route path='/employees/delete/:id/emailDetail/:emailDetailId' element={<DeleteEmployee />} /> */}
    </Routes>
  );
};

export default App;
