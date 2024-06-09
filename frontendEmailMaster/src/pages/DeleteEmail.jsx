import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteEmail = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email_id } = useParams(); // Correctly retrieve 'email_id' from route params
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteEmailDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:8800/emails/${email_id}`);
      setLoading(false);
      enqueueSnackbar('Email detail deleted successfully', { variant: 'success' });
      navigate('/emails'); // Navigate to home or appropriate route after deletion
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error deleting email detail', { variant: 'error' });
      console.log(error);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Email Detail</h1>
      {loading && <Spinner />}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this email detail?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteEmailDetail}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteEmail;
