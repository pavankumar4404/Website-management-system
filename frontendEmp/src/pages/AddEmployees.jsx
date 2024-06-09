import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddEmployee = () => {
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
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [commonNames, setCommonNames] = useState([]);
  const [location,setLocation]=useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get('http://localhost:8800/states')
      .then(response => {
        setStates(response.data);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
      
    axios.get('http://localhost:8800/districts')
      .then(response => {
        setDistricts(response.data);
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });

    axios.get('http://localhost:8800/common_names/category/11')
      .then(response => {
        setCommonNames(response.data);
      })
      .catch(error => {
        console.error('Error fetching common names:', error);
      });
      axios.get('http://localhost:8800/common_names/category/7')
      .then(response => {
        setLocation(response.data);
      })
      .catch(error => {
        console.error('Error fetching location:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSaveEmployee = () => {
    setLoading(true);
    axios
      .post('http://localhost:8800/emps', employee)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Employee added successfully', { variant: 'success' });
        navigate('/employees');
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
      <h1 className='text-3xl my-4'>Add Employee</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>EMP ID</label>
          <input
            type='int'
            name='emp_id'
            value={employee.emp_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>EMP NAME</label>
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
          <select
            name='designation_id'
            value={employee.designation_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a designation</option>
            {commonNames.map(item => (
              <option key={item.common_id} value={item.common_id}>
                {item.common_name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>PERSONAL EMAIL ID</label>
          <input
            type='email'
            name='name_based_email_id'
            value={employee.name_based_email_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>MOBILE NO</label>
          <input
            type='tel'
            name='mobile_no'
            value={employee.mobile_no}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>POSTING LOCATION</label>
          <select
            name='posting_location_id'
            value={employee.posting_location_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a location</option>
            {location.map(item => (
              <option key={item.common_id} value={item.common_id}>
                {item.common_name}
              </option>
            ))}
          </select>
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
            type='tel'
            name='emergency_contact_no'
            value={employee.emergency_contact_no}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>STATE</label>
          <select
            name='state_id'
            value={employee.state_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a state</option>
            {states.map(state => (
              <option key={state.state_id} value={state.state_id}>
                {state.state_name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>DISTRICT</label>
          <select
            name='district_id'
            value={employee.district_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a district</option>
            {districts.map(district => (
              <option key={district.district_id} value={district.district_id}>
                {district.district_name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>EMP TYPE</label>
          <input
            type='int'
            name='emp_type'
            value={employee.emp_type}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 my-4' onClick={handleSaveEmployee}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
