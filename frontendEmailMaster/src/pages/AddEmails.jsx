import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddEmails = () => {
  const [emails, setEmails] = useState({
    emp_id: '',
    email_id: '',
    email_type: '',
    email_detail: '',
  });
  const [emailsType, setEmailsType] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Load emp_id from localStorage when component mounts
  useEffect(() => {
    const savedEmpId = localStorage.getItem('emp_id');
    if (savedEmpId) {
      setEmails((prevEmails) => ({
        ...prevEmails,
        emp_id: savedEmpId,
      }));
    }
    axios.get('http://localhost:8800/common_names/category/16')
      .then(response => {
        setEmailsType(response.data);
      })
      .catch(error => {
        console.error('Error fetching email types:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmails((prevEmails) => ({
      ...prevEmails,
      [name]: value,
    }));
  };

  const handleSaveEmail = () => {
    setLoading(true);
    const { emp_id, email_id, email_type, email_detail } = emails;

    if (!emp_id) {
      enqueueSnackbar('EMP ID is required', { variant: 'warning' });
      setLoading(false);
      return;
    }

    axios
      .post('http://localhost:8800/emails', { emp_id, email_id, email_type, email_detail })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Email added successfully', { variant: 'success' });

        // Save emp_id to localStorage
        localStorage.setItem('emp_id', emp_id);

        // Clear other fields but keep emp_id
        setEmails((prevEmails) => ({
          ...prevEmails,
          email_id: '',
          email_type: '',
          email_detail: '',
        }));
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleClearEmpId = () => {
    setEmails((prevEmails) => ({
      ...prevEmails,
      emp_id: '',
    }));
    localStorage.removeItem('emp_id');
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add Email</h1>
      {loading && <Spinner />}
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>EMP ID</label>
        <div className='flex'>
          <input
            type='text'
            name='emp_id'
            value={emails.emp_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            readOnly={Boolean(localStorage.getItem('emp_id'))}
          />
          <button
            className='bg-red-500 text-white px-4 py-2 ml-2 rounded'
            onClick={handleClearEmpId}
          >
            Clear
          </button>
        </div>
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>EMAIL TYPE</label>
        <select
          name='email_type'
          value={emails.email_type}
          onChange={handleChange}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        >
          <option value="" disabled>Select a type</option>
          {emailsType.map(item => (
            <option key={item.common_id} value={item.common_id}>
              {item.common_name}
            </option>
          ))}
        </select>
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>EMAIL ID</label>
        <input
          type='email'
          name='email_id'
          value={emails.email_id}
          onChange={handleChange}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>EMAIL DETAIL</label>
        <input
          type='text'
          name='email_detail'
          value={emails.email_detail}
          onChange={handleChange}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded'
          onClick={handleSaveEmail}
        >
          Save Email
        </button>
      </div>
    </div>
  );
};

export default AddEmails;
