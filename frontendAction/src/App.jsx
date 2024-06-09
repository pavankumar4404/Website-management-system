import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ActionHome from "./pages/Home";
import AddVulnerability from "./pages/AddVulnerability";
import EditVulnerability from "./pages/EditVulnerability";
import VulnerabilityAction from "./pages/VulnerabilityAction";

const App = () => {
  return (
    <Routes>
        <Route path="/vulnerabilities" element={<ActionHome />} />
        <Route path="/vulnerabilities/create" element={<AddVulnerability />} />
        <Route path="/vulnerabilities/edit/:id" element={<EditVulnerability />} />
        <Route path="/vulnerabilities/action/:id" element={<VulnerabilityAction />} />
    </Routes>
  );
};

export default App;
