
import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddEmployee = () => {
  const [website, setWebsite] = useState({
    website_id: '',
    website_url: '',
website_name: '',
website_description: '',
dept_id: '',
last_audit_status: '',
last_audit_date: '',
last_audit_validity_date: '',
last_ssl_status: '',
last_ssl_date: '',
last_ssl_validity_date: '',
last_pac_category: '',
last_pac_no: '',
last_pac_date: '',
last_pac_status: '',
remarks: '',
website_status_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [departments,setDepartments]=useState([]);
  const [certificates,setCertificates]=useState([]);
  const [websiteStatus,setWebsiteStatus]=useState([]);
  const [pacCategories,setPacCategories]=useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get('http://localhost:8800/department')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
      axios.get('http://localhost:8800/common_names/category/13')
      .then(response => {
        setCertificates(response.data);
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
      .post('http://localhost:8800/websitemasters', website)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('website added successfully', { variant: 'success' });
        navigate('/books');
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
      <h1 className='text-3xl my-4'>Add Website</h1>
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
          <label className='text-xl mr-4 text-gray-500'>Website url</label>
          <input
            type='text'
            name='website_url'
            value={website.website_url}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Website Name</label>
          <input
            type='text'
            name='website_name'
            value={website.website_name}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Department</label>
          <select
            name='dept_id'
            value={website.dept_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a department</option>
            {departments.map(department => (
              <option key={department.dept_id} value={department.dept_id}>
                {department.dept_name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input
            type='text'
            name='website_description'
            value={website.website_description}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Last Audit Status</label>
          <select
            name='last_audit_status'
            value={website.last_audit_status}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a certificate status</option>
            {certificates.map(item => (
              <option key={item.common_id} value={item.common_id}>
                {item.common_name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Last Audit Date</label>
          <input
            type='date'
            name='last_audit_date'
            value={website.last_audit_date}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Audit Validity Date</label>
          <input
            type='date'
            name='last_audit_validity_date'
            value={website.last_audit_validity_date}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Last SSL Status</label>
          <select
            name='last_ssl_status'
            value={website.last_ssl_status}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a certificate status</option>
            {certificates.map(item => (
              <option key={item.common_id} value={item.common_id}>
                {item.common_name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Last SSL Date</label>
          <input
            type='date'
            name='last_ssl_date'
            value={website.last_ssl_date}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>SSL Validity Date</label>
          <input
            type='date'
            name='last_ssl_validity_date'
            value={website.last_ssl_validity_date}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Last PAC Category</label>
          <select
            name='last_pac_category'
            value={website.last_pac_category}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a website status</option>
            {pacCategories.map(item => (
              <option key={item.common_id} value={item.common_id}>
                {item.common_name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Last PAC No</label>
          <input
            type='text'
            name='last_pac_no'
            value={website.last_pac_no}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Last PAC Date</label>
          <input
            type='date'
            name='last_pac_date'
            value={website.last_pac_date}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Last PAC Status</label>
          <select
            name='last_pac_status'
            value={website.last_pac_status}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a certificate status</option>
            {certificates.map(item => (
              <option key={item.common_id} value={item.common_id}>
                {item.common_name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Remarks</label>
          <input
            type='text'
            name='remarks'
            value={website.remarks}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Website Status</label>
          <select
            name='website_status_id'
            value={website.website_status_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a website status</option>
            {websiteStatus.map(item => (
              <option key={item.common_id} value={item.common_id}>
                {item.common_name}
              </option>
            ))}
          </select>
        </div>
        <button className='p-2 bg-sky-300 my-4' onClick={handleSaveWebsite}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;

