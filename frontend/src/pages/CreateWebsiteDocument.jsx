import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateWebsiteDocument = () => {
  const [website, setWebsite] = useState({

website_id: '',
category_id: '',
common_id: '',
document_name: '',
vendor_name: '',
issue_date: '',
validity_date: '',
pac_no: '',
pac_category: '',
document_id: '',
document_path: '',
  });
  const [loading, setLoading] = useState(false);
  const [document,setDocuments]=useState([]);
  const [certificates,setCertificates]=useState([]);
  const [websiteStatus,setWebsiteStatus]=useState([]);
  const [pacCategories,setPacCategories]=useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    
      axios.get('http://localhost:8800/common_names/category/18')
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error fetching certificate status:', error);
      });
      axios.get('http://localhost:8800/common_names/category/10')
      .then(response => {
        setWebsiteStatus(response.data);
      })
      .catch(error => {
        console.error('Error fetching website status:', error);
      });
      axios.get('http://localhost:8800/common_names/category/19')
      .then(response => {
        setPacCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching PAC category:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWebsite({ ...website, [name]: value });
  };

  const handleSaveWebsite = () => {
    setLoading(true);
    axios
      .post('http://localhost:8800/websitedocuments', website)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('website document added successfully', { variant: 'success' });
        navigate('/books1');
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
      <h1 className='text-3xl my-4'>Add Website Document</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Website ID</label>
          <input
            type='int'
            name='website_id'
            value={website.website_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Category ID</label>
          <input
            type='int'
            name='category_id'
            value={website.category_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Common ID</label>
          <select
            name='common_id'
            value={website.common_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a document type</option>
            {document.map(item => (
              <option key={item.common_id} value={item.common_id}>
                {item.common_name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Document Name</label>
          <input
            type='text'
            name='document_name'
            value={website.document_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Vendor Name</label>
          <input
            type='text'
            name='vendor_name'
            value={website.vendor_name}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Issue Date</label>
          <input
            type='date'
            name='issue_date'
            value={website.issue_date}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Validity DAte</label>
          <input
            type='date'
            name='validity_date'
            value={website.validity_date}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>PAC No</label>
          <input
            type='text'
            name='pac_no'
            value={website.pac_no}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>PAC Category</label>
          <select
            name='pac_category'
            value={website.pac_category}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a website status</option>
            {pacCategories.map(item => (
              <option key={item.common_id} value={item.common_id}>
                {item.common_name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>document Id</label>
          <input
            type='int'
            name='document_id'
            value={website.document_id}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Document Path</label>
          <select
            name='document_path'
            value={website.document_path}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select a document type</option>
            {document.map(item => (
              <option key={item.common_id} value={item.common_id}>
                {item.document_path}
              </option>
            ))}
          </select>
        </div>
        <button className='p-2 bg-sky-300 my-4' onClick={handleSaveWebsite}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateWebsiteDocument;

// website_id,int
// emp_id,int
// emp_role,int
// email_id,varchar
// transfer_date,date
// transfer_to_emp_email_id,varchar
// transfer_to_emp_id,int
// transfer_to_emp_role,int
// status,char(1)
