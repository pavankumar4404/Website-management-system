// import React, { useState } from 'react';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSnackbar } from 'notistack';

// const DeleteEmployee = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { emp_id } = useParams(); // Retrieve 'id' from route params
//   const { enqueueSnackbar } = useSnackbar();

//   const handleDeleteEmployee = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.delete(`http://localhost:8800/emps/${emp_id}`);
//       setLoading(false);
//       enqueueSnackbar('Employee deleted successfully', { variant: 'success' });
//       navigate('/'); // Navigate to home or appropriate route after deletion
//     } catch (error) {
//       setLoading(false);
//       enqueueSnackbar('Error deleting employee', { variant: 'error' });
//       console.log(error);
//     }
//   };

//   return (
//     <div className='p-4'>
//       <BackButton />
//       <h1 className='text-3xl my-4'>Delete Employee</h1>
//       {loading && <Spinner />}
//       <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
//         <h3 className='text-2xl'>Are you sure you want to delete this employee?</h3>
//         <button
//           className='p-4 bg-red-600 text-white m-8 w-full'
//           onClick={handleDeleteEmployee}
//         >
//           Yes, Delete it
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeleteEmployee;


import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteEmployee = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { emp_id } = useParams(); // Ensure 'emp_id' matches the route parameter name
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteEmployee = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:8800/emps/${emp_id}`);
      setLoading(false);
      enqueueSnackbar('Employee deleted successfully', { variant: 'success' });
      navigate('/employees'); // Navigate to home or appropriate route after deletion
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error deleting employee', { variant: 'error' });
      console.log(error);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Employee</h1>
      {loading && <Spinner />}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this employee?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteEmployee}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;
