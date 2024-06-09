import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeamHome from './pages/Home';
import AddTeams from './pages/AddTeams';
import ShowTeams from './pages/ShowTeams';
import EditTeam from './pages/EditTeam';
import DeleteTeam from './pages/DeleteTeam';

const App = () => {
  return (
    <Routes>
      <Route path='/teams' element={<TeamHome />} />
      <Route path='/teams/create' element={<AddTeams />} />
      <Route path='/teams/details/:emp_id' element={<ShowTeams />} />
      <Route path='/teams/edit/:emp_id' element={<EditTeam />} />
      <Route path='/teams/delete/:emp_id' element={<DeleteTeam />} />
      <Route path='/teams/delete/:teamId/members/:memberId' element={<DeleteTeam />} />
    </Routes>
  );
};

export default App;
