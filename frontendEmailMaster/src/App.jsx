import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmailHome from './pages/Home';
import AddEmails from './pages/AddEmails';
import ShowEmail from './pages/ShowEmail';
import EditEmail from './pages/EditEmail';
import DeleteEmail from './pages/DeleteEmail';

const App = () => {
  return (
    <Routes>
      <Route path='/emails' element={<EmailHome />} />
      <Route path='/emails/create' element={<AddEmails />} />
      <Route path='/emails/details/:email_id' element={<ShowEmail />} />
      <Route path='/emails/edit/:email_id' element={<EditEmail />} />
      <Route path='/emails/delete/:email_id' element={<DeleteEmail />} />
      <Route path='/emails/delete/:id/emailDetail/:emailDetailId' element={<DeleteEmail />} />
    </Routes>
  );
};

export default App;
