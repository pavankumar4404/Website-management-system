import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddTeamMembers = () => {
  const [teams, setTeams] = useState({
    emp_id: '',
    team_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [getTeam, setGetTeam] = useState([]);
  const [getEmp, setGetEmp] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const savedTeamId = localStorage.getItem('team_id');
    if (savedTeamId) {
      setTeams((prevTeams) => ({
        ...prevTeams,
        team_id: savedTeamId,
      }));
    }

    axios.get('http://localhost:8800/common_names/category/15')
      .then(response => {
        setGetTeam(response.data);
      })
      .catch(error => {
        console.error('Error fetching sources:', error);
      });
    axios.get('http://localhost:8800/getEmployee')
      .then(response => {
        setGetEmp(response.data);
      })
      .catch(error => {
        console.error('Error fetching sources:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeams((prevTeams) => ({
      ...prevTeams,
      [name]: value,
    }));
  };

  const handleSaveTeam = () => {
    const data = {
      team_id: teams.team_id,
      emp_id: teams.emp_id,
    };
    setLoading(true);
    axios
      .post('http://localhost:8800/teams', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Team added successfully', { variant: 'success' });
        localStorage.setItem('team_id', teams.team_id);
        setTeams((prevTeams) => ({
          ...prevTeams,
          emp_id: '',
        }));
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const clearTeamId = () => {
    localStorage.removeItem('team_id');
    setTeams((prevTeams) => ({
      ...prevTeams,
      team_id: '',
    }));
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add Team</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4 flex items-center'>
          <label className='text-xl mr-4 text-gray-500'>TEAM ID</label>
          <select
            name='team_id'
            value={teams.team_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            disabled={Boolean(localStorage.getItem('team_id'))}
          >
            <option value="" disabled>Select a Team</option>
            {getTeam.map(item => (
              <option key={item.common_id} value={item.common_id}>
                {item.common_name}
              </option>
            ))}
          </select>
          <button
            className='ml-4 p-2 bg-red-300'
            onClick={clearTeamId}
          >
            Clear
          </button>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>EMP ID</label>
          <select
            name='emp_id'
            value={teams.emp_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select an employee</option>
            {getEmp.map(item => (
              <option key={item.emp_id} value={item.emp_id}>
                {item.emp_name}
              </option>
            ))}
          </select>
        </div>

        <button
          className='p-2 bg-sky-300 m-8'
          onClick={handleSaveTeam}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddTeamMembers;
