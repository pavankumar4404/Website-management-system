import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton1 from '../components/BackButton';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const HomeTeam = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8800/websiteteams")
      .then((response) => {
        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setWebsites(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          setWebsites(response.data.data);
        } else {
          setWebsites([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  }, []);

  let serialNumber = 1;


  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
      <BackButton1/>
        <h1 className='text-3x1 my-8'>Website Master</h1>
        <Link to='/books/createTeam'>
          <MdOutlineAddBox className='text-sky-800 text-4x1' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Website Id</th>
              <th className='border border-slate-600 rounded-md'>Emp ID</th>
              <th className='border border-slate-600 rounded-md'>Emp Role</th>
              <th className='border border-slate-600 rounded-md'>Email Id</th>
              <th className='border border-slate-600 rounded-md'>Transfer Date</th>
              <th className='border border-slate-600 rounded-md'>Transfer to Emp ID</th>
              <th className='border border-slate-600 rounded-md'>Transfer to Emp Role</th>
              <th className='border border-slate-600 rounded-md'>Transfer to Emp Email ID</th>
              <th className='border border-slate-600 rounded-md'>Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {websites.length > 0 ? (
              websites.map((website) => (
                <tr key={website._id || website.website_id} className="h-12 even:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{serialNumber++}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.website_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.emp_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.emp_role}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.email_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.transfer_date}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.transfer_to_emp_email_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.transfer_to_emp_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.transfer_to_emp_role}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.status}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="flex justify-center gap-x-4">
                      
                      <Link to={`/books/edit/${website.website_id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/books/delete/${website.website_id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="border border-gray-300 p-2 text-center">
                  No websites found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomeTeam;


