import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateWebsiteDocument = () => {
  const [website, setWebsite] = useState({

website_id: '',
emp_id: '',
emp_role: '',
email_id: '',
transfer_date: '',
transfer_to_emp_email_id: '',
transfer_to_emp_id: '',
transfer_to_emp_role: '',
status: '',
  });
  const [loading, setLoading] = useState(false);
  const [document,setDocuments]=useState([]);
  const [certificates,setCertificates]=useState([]);
  const [websiteStatus,setWebsiteStatus]=useState([]);
  const [pacCategories,setPacCategories]=useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    
      axios.get('http://localhost:8800/common_names/category/18')
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error fetching certificate status:', error);
      });
      axios.get('http://localhost:8800/common_names/category/10')
      .then(response => {
        setWebsiteStatus(response.data);
      })
      .catch(error => {
        console.error('Error fetching website status:', error);
      });
      axios.get('http://localhost:8800/common_names/category/19')
      .then(response => {
        setPacCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching PAC category:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWebsite({ ...website, [name]: value });
  };

  const handleSaveWebsite = () => {
    setLoading(true);
    axios
      .post('http://localhost:8800/websiteteams', website)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('website document added successfully', { variant: 'success' });
        navigate('/books2');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add Website Teams</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Website ID</label>
          <input
            type='int'
            name='website_id'
            value={website.website_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Emp ID</label>
          <input
            type='int'
            name='emp_id'
            value={website.emp_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Emp Role</label>
          <input
            type='int'
            name='emp_role'
            value={website.emp_role}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Email ID</label>
          <input
            type='text'
            name='email_id'
            value={website.email_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Transfer Date</label>
          <input
            type='date'
            name='transfer_date'
            value={website.transfer_date}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Transfer to Emp Email ID</label>
          <input
            type='text'
            name='transfer_to_emp_email_id'
            value={website.transfer_to_emp_email_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Transfer to Emp ID</label>
          <input
            type='int'
            name='transfer_to_emp_id'
            value={website.transfer_to_emp_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Transfer to Emp Role</label>
          <input
            type='int'
            name='transfer_to_emp_role'
            value={website.transfer_to_emp_role}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Status</label>
          <input
            type='text'
            name='status'
            value={website.status}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        
        
        <button className='p-2 bg-sky-300 my-4' onClick={handleSaveWebsite}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateWebsiteDocument;

