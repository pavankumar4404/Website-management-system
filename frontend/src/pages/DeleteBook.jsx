import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { website_id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log('website_id:', website_id); // Debugging line to check website_id
  }, [website_id]);

  const handleDeleteBook = () => {
    if (!website_id) {
      enqueueSnackbar('Invalid website ID', { variant: 'error' });
      return;
    }

    setLoading(true);
    axios
      .delete(`http://localhost:8800/websitemasters/${website_id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Record Deleted successfully', { variant: 'success' });
        navigate('/books');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting record', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Record</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this record?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook;

