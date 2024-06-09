import React, { useState, useEffect } from 'react';
import BackButton from '../src/components/BackButton';
import Spinner from '../src/components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateAction = () => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    vulId: '',
    reportedDate: '',
    subject: '',
    document: '',
    vulStatus: '',
    action: '',
    actionStatus: ''
  });
  const [bookExists, setBookExists] = useState(true);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        const book = response.data;
        setWebsiteUrl(book.websiteUrl);
        setLoading(false);
        setBookExists(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setBookExists(false);
        }
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleSaveBook = () => {
    setLoading(true);
    axios
      .post(`http://localhost:5555/books/${id}/reportDetail`, { ...report, websiteUrl })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Report details added successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error adding report details', { variant: 'error' });
        console.log(error);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  if (!bookExists) {
    return (
      <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Book Not Found</h1>
        <p>The requested book with ID {id} does not exist.</p>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add Report Details</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <label className='text-xl mr-4 text-gray-500'>URL</label>
        <input
        type='text'
        name='websiteUrl'
        value={websiteUrl}
        readOnly
        disabled
        className='border-2 border-gray-500 px-4 py-2 w-full mb-2 bg-gray-100 cursor-not-allowed'
/>
        
        <label className='text-xl mr-4 text-gray-500'>Vulnerability ID</label>
        <input
          type='text'
          name='vulId'
          value={report.vulId}
          onChange={handleInputChange}
          className='border-2 border-gray-500 px-4 py-2 w-full mb-2'
        />
        <label className='text-xl mr-4 text-gray-500'>Reported Date</label>
        <input
          type='date'
          name='reportedDate'
          value={report.reportedDate}
          onChange={handleInputChange}
          className='border-2 border-gray-500 px-4 py-2 w-full mb-2'
        />
        <label className='text-xl mr-4 text-gray-500'>Subject</label>
        <input
          type='text'
          name='subject'
          value={report.subject}
          onChange={handleInputChange}
          className='border-2 border-gray-500 px-4 py-2 w-full mb-2'
        />
        <label className='text-xl mr-4 text-gray-500'>Document</label>
        <input
          type='text'
          name='document'
          value={report.document}
          onChange={handleInputChange}
          className='border-2 border-gray-500 px-4 py-2 w-full mb-2'
        />
        <label className='text-xl mr-4 text-gray-500'>Vulnerability Status</label>
        <input
          type='text'
          name='vulStatus'
          value={report.vulStatus}
          onChange={handleInputChange}
          className='border-2 border-gray-500 px-4 py-2 w-full mb-2'
        />
        <label className='text-xl mr-4 text-gray-500'>Action</label>
        <input
          type='text'
          name='action'
          value={report.action}
          onChange={handleInputChange}
          className='border-2 border-gray-500 px-4 py-2 w-full mb-2'
        />
        <label className='text-xl mr-4 text-gray-500'>Action Status</label>
        <input
          type='text'
          name='actionStatus'
          value={report.actionStatus}
          onChange={handleInputChange}
          className='border-2 border-gray-500 px-4 py-2 w-full mb-2'
        />
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateAction;


// import React, { useState } from 'react';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useSnackbar } from 'notistack';
// import { Book } from '../../test/test1';

// const CreateAction = () => {
//   const [websiteUrl, setwebsiteUrl] = useState('');
//   const [vulId, setvulId] = useState('');
//   const [reportedDate, setreportedDate] = useState('');
//   const [subject, setsubject] = useState('');
//   const [document, setdocument] = useState('');
//   const [vulStatus, setvulStatus] = useState('');
//   const [action, setaction] = useState('');
//   const [actionStatus, setactionStatus] = useState('');
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5555/books/${id}`)
//       .then((response) => {
//         setBook(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);
//   const handleSaveBook = () => {
//     const data = {
//       websiteUrl, vulId, reportedDate, subject, document, vulStatus, action, actionStatus, 
//     };
//     setLoading(true);
//     axios
//       .post('http://localhost:5555/books/${id}/reportDetail', data)
//       .then(() => {
//         setLoading(false);
//         enqueueSnackbar('Book Created successfully', { variant: 'success' });
//         navigate('/');
//       })
//       .catch((error) => {
//         setLoading(false);
//         // alert('An error happened. Please Chack console');
//         enqueueSnackbar('Error', { variant: 'error' });
//         console.log(error);
//       });
//   };

//   return (
//     <div className='p-4'>
//       <BackButton />
//       <h1 className='text-3xl my-4'>Create Book</h1>
//       {loading ? <Spinner /> : ''}
//       <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-gray-500'>Website URL</label>
//           <input
//             type='text'
//             value={Book.websiteUrl}

//             className='border-2 border-gray-500 px-4 py-2 w-full'
//           />
//         </div>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-gray-500'>vulId</label>
//           <input
//             type='text'
//             value={vulId}
//             onChange={(e) => setvulId(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2  w-full '
//           />
//         </div>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-gray-500'>Date</label>
//           <input
//             type='date'
//             value={reportedDate}
//             onChange={(e) => setreportedDate(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2  w-full '
//           />
//         </div>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-gray-500'>Subject</label>
//           <input
//             type='text'
//             value={subject}
//             onChange={(e) => setsubject(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2  w-full '
//           />
//         </div>
//         <div className='my-4'>
//         <label className='text-xl mr-4 text-gray-500'>Document</label>
      
//           value={document}
//           onChange={(e) => setdocument(e.target.value)}
//           className='border-2 border-gray-500 px-4 py-2 w-full'
        
         
//       </div>
//       <div className='my-4'>
//         <label className='text-xl mr-4 text-gray-500'>Status</label>

//           value={vulStatus}
//           onChange={(e) => setvulStatus(e.target.value)}
//           className='border-2 border-gray-500 px-4 py-2 w-full'
        
//       </div>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-gray-500'>Action</label>
//           <input
//             type='text'
//             value={action}
//             onChange={(e) => setaction(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2  w-full '
//           />
//         </div>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-gray-500'>Action Status</label>
//           <input
//             type='text'
//             value={actionStatus}
//             onChange={(e) => setactionStatus(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2  w-full '
//           />
//         </div>
        
       
       
//         <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CreateAction