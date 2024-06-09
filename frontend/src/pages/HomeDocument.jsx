import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton1 from '../components/BackButton';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const HomeDocument = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8800/websitedocuments")
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
        console.error("Error fetching website documents:", error);
        setLoading(false);
      });
  }, []);

  let serialNumber = 1;


  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
      <BackButton1/>
        <h1 className='text-3x1 my-8'>Website Documents</h1>
        <Link to='/books/createDocument'>
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
              <th className='border border-slate-600 rounded-md'>Category ID</th>
              <th className='border border-slate-600 rounded-md'>Common ID</th>
              <th className='border border-slate-600 rounded-md'>Document Name</th>
              <th className='border border-slate-600 rounded-md'>Vendor Name</th>
              <th className='border border-slate-600 rounded-md'>Issue Date</th>
              <th className='border border-slate-600 rounded-md'>Validity Date</th>
              <th className='border border-slate-600 rounded-md'>PAC No</th>
              <th className='border border-slate-600 rounded-md'>PAC Category</th>
              <th className='border border-slate-600 rounded-md'>Document ID</th>
              <th className='border border-slate-600 rounded-md'>Document Path</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {websites.length > 0 ? (
              websites.map((website) => (
                <tr key={website._id || website.website_id} className="h-12 even:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{serialNumber++}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.website_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.category_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.common_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.document_name}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.vendor_name}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.issue_date}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.validity_date}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.pac_no}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.pac_category}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.document_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{website.document_path}</td>
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

export default HomeDocument;


