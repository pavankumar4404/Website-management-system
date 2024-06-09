import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8800/emps/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Employee</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>ID</span>
            <span>{employee._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Employee ID</span>
            <span>{employee.emp_id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Name</span>
            <span>{employee.emp_name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Designation ID</span>
            <span>{employee.designation_id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Email</span>
            <span>{employee.name_based_email_id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Mobile No</span>
            <span>{employee.mobile_no}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Location ID</span>
            <span>{employee.posting_location_id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>IP Phone</span>
            <span>{employee.ip_phone}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Emergency Contact</span>
            <span>{employee.emergency_contact_no}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>State Code</span>
            <span>{employee.state_id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>District Code</span>
            <span>{employee.district_id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Employee Type</span>
            <span>{employee.emp_type}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowEmployee;
