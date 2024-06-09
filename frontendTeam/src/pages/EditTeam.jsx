import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditTeam = () => {
  const [teamData, setTeamData] = useState({
    emp_id: '',
    team_id: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { emp_id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8800/teams/${emp_id}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const data = response.data[0];
          setTeamData(data);
        }
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  }, [emp_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditTeam = () => {
    setLoading(true);
    axios.put(`http://localhost:8800/teams/${emp_id}`, teamData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Team edited successfully', { variant: 'success' });
        navigate('/teams');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing team', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Team</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Team ID</label>
          <input
            type='text'
            name='team_id'
            value={teamData.team_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Employee ID</label>
          <input
            type='text'
            name='emp_id'
            value={teamData.emp_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button
          className='p-2 bg-sky-300 m-8'
          onClick={handleEditTeam}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTeam;
