import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton1 from '../components/BackButton1';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8800/websitemasters")
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
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4x1' />
        </Link>
        <Link to='/books1'>
      <button className='p-4 bg-blue-600 text-white m-8'>
        Go to Website Document
      </button>
    </Link>
    <Link to='/books2'>
      <button className='p-4 bg-blue-600 text-white m-8'>
        Go to Website Team
      </button>
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
              <th className='border border-slate-600 rounded-md'>URL</th>
              <th className='border border-slate-600 rounded-md'>Name</th>
              <th className='border border-slate-600 rounded-md'>description</th>
              <th className='border border-slate-600 rounded-md'>Dept Id</th>
              <th className='border border-slate-600 rounded-md'>Last Audit Status</th>
              <th className='border border-slate-600 rounded-md'>Last Audit Date</th>
              <th className='border border-slate-600 rounded-md'>Last Audit Validity</th>
              <th className='border border-slate-600 rounded-md'>Last SSL Status</th>
              <th className='border border-slate-600 rounded-md'>Last SSL Date</th>
              <th className='border border-slate-600 rounded-md'>Last SSL Validity</th>
              <th className='border border-slate-600 rounded-md'>Last PAC category</th>
              <th className='border border-slate-600 rounded-md'>Last PAC No</th>
              <th className='border border-slate-600 rounded-md'>Last PAC Date</th>
              <th className='border border-slate-600 rounded-md'>Last PAC Status</th>
              <th className='border border-slate-600 rounded-md'>Remarks</th>
              <th className='border border-slate-600 rounded-md'>Website Status ID</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {websites.length > 0 ? (
              websites.map((website) => (
                <tr key={website._id || website.website_id} className="h-12 even:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{serialNumber++}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.website_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.website_url}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.website_name}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.website_description}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.dept_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.last_audit_status}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.last_audit_date}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.last_audit_validity_date}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.last_ssl_status}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.last_ssl_date}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.last_ssl_validity_date}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.last_pac_category}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.last_pac_no}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.last_pac_date}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.last_pac_status}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.remarks}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.website_status_id}</td>
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

export default Home;


// website_id,int
// emp_id,int
// emp_role,int
// email_id,varchar
// transfer_date,date
// transfer_to_emp_email_id,varchar
// transfer_to_emp_id,int
// transfer_to_emp_role,int
// status,char(1)