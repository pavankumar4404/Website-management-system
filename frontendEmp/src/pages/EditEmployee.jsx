import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    emp_id: '',
    emp_name: '',
    designation_id: '',
    name_based_email_id: '',
    mobile_no: '',
    posting_location_id: '',
    ip_phone: '',
    emergency_contact_no: '',
    state_id: '',
    district_id: '',
    emp_type: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { emp_id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8800/emps/${emp_id}`)
      .then((response) => {
        const { _id, createdAt, updatedAt, ...data } = response.data;
        setEmployee(data);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.log(error);
      });
  }, [emp_id, enqueueSnackbar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleEditEmployee = () => {
    setLoading(true);
    axios.put(`http://localhost:8800/emps/${emp_id}`, employee)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Employee details updated successfully', { variant: 'success' });
        navigate('/employees');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating employee details', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Employee</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>EMPLOYEE ID</label>
          <input
            type='number'
            name='emp_id'
            value={employee.emp_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>EMPLOYEE NAME</label>
          <input
            type='text'
            name='emp_name'
            value={employee.emp_name}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>DESIGNATION</label>
          <input
            type='number'
            name='designation_id'
            value={employee.designation_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>PERSONAL EMAIL ID</label>
          <input
            type='text'
            name='name_based_email_id'
            value={employee.name_based_email_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>MOBILE NO</label>
          <input
            type='text'
            name='mobile_no'
            value={employee.mobile_no}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>POSTING LOCATION</label>
          <input
            type='number'
            name='posting_location_id'
            value={employee.posting_location_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>IP PHONE</label>
          <input
            type='text'
            name='ip_phone'
            value={employee.ip_phone}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>EMERGENCY CONTACT NO</label>
          <input
            type='text'
            name='emergency_contact_no'
            value={employee.emergency_contact_no}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>STATE ID</label>
          <input
            type='number'
            name='state_id'
            value={employee.state_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>DISTRICT ID</label>
          <input
            type='number'
            name='district_id'
            value={employee.district_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>EMPLOYEE TYPE</label>
          <input
            type='number'
            name='emp_type'
            value={employee.emp_type}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button
          className='p-2 bg-sky-300 my-4'
          onClick={handleEditEmployee}
          disabled={loading}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditEmployee;
