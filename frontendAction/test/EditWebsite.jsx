import React, { useState, useEffect } from 'react';
import BackButton from '../src/components/BackButton';
import Spinner from '../src/components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditWebsite = () => {
  const [website_url, setWebsiteUrl] = useState('');
  const [website_name, setWebsiteName] = useState('');
  const [dept, setDept] = useState('');
  const [ip_addr, setIpAddr] = useState('');
  const [ssl, setSsl] = useState('');
  const [sec_audit, setSecAudit] = useState('');
  const [hod, setHod] = useState('');
  const [os, setOs] = useState('');
  const [loc, setLoc] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/vulnerabilities/${id}`)
      .then((response) => {
        const website = response.data;
        setWebsiteUrl(website.website_url);
        setWebsiteName(website.website_name);
        setDept(website.dept);
        setIpAddr(website.ip_addr);
        setSsl(website.ssl ? 'yes' : 'no');
        setSecAudit(website.sec_audit ? 'yes' : 'no');
        setHod(website.hod);
        setOs(website.os);
        setLoc(website.loc);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error loading website details', { variant: 'error' });
        console.log(error);
      });
  }, [id]);  

  const handleEditWebsite = () => {
    const data = {
      website_url, website_name, dept, ip_addr, ssl, sec_audit, hod, os, loc
    };
    setLoading(true);
    axios.put(`http://localhost:5555/vulnerabilities/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Website Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing website', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Website</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Website URL</label>
          <input
            type='text'
            value={website_url}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Website Name</label>
          <input
            type='text'
            value={website_name}
            onChange={(e) => setWebsiteName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Department</label>
          <input
            type='text'
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>IP Address</label>
          <input
            type='text'
            value={ip_addr}
            onChange={(e) => setIpAddr(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>SSL</label>
            <select
                value={ssl}
                onChange={(e) => setSsl(e.target.value === 'yes')}
                className='border-2 border-gray-500 px-4 py-2 w-full'
            >
                <option value=''>Select</option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
            </select>
            </div>
            <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Security Audit</label>
            <select
                value={sec_audit}
                onChange={(e) => setSecAudit(e.target.value === 'yes')}
                className='border-2 border-gray-500 px-4 py-2 w-full'
            >
                <option value=''>Select</option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
            </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>HOD Name</label>
          <input
            type='text'
            value={hod}
            onChange={(e) => setHod(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>OS</label>
          <input
            type='text'
            value={os}
            onChange={(e) => setOs(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Location</label>
          <input
            type='text'
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditWebsite}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditWebsite;