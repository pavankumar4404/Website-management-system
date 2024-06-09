import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditEmail = () => {
  const [emailData, setEmailData] = useState({
    emp_id: '',
    email_id: '',
    email_type: '',
    email_detail: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email_id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8800/emails/${email_id}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const data = response.data[0];
          setEmailData(data);
        }
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  }, [email_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditEmail = () => {
    setLoading(true);
    axios.put(`http://localhost:8800/emails/${email_id}`, emailData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Email edited successfully', { variant: 'success' });
        navigate('/emails');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing email', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Email</h1>
      {loading ? <Spinner /> : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Employee ID</label>
            <input
              type='text'
              name='emp_id'
              value={emailData.emp_id}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Email ID</label>
            <input
              type='email'
              name='email_id'
              value={emailData.email_id}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Email Type</label>
            <input
              type='text'
              name='email_type'
              value={emailData.email_type}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Email Detail</label>
            <input
              type='text'
              name='email_detail'
              value={emailData.email_detail}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <button
            className='p-2 bg-sky-300 m-8'
            onClick={handleEditEmail}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditEmail;
