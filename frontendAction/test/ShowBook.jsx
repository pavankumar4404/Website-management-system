// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';
// import { BsInfoCircle } from 'react-icons/bs';
// import { AiOutlineEdit } from 'react-icons/ai';
// import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md';

// const ShowBook = () => {
//   const [book, setBook] = useState(null); // Store the book data
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5555/books/${id}/reportDetails`)
//       .then((response) => {
//         setBook(response.data); // Assuming the response contains the book data with reportDetail
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoading(false);
//       });
//   }, [id]);

//   let serialNumber = 1;

//   return (
//     <div className='p-4'>
//       <BackButton />
//       <h1 className='text-3xl my-4'>Show Book Details</h1>
//       <Link to={`/books/${id}/reportDetail`}>
//         <MdOutlineAddBox className='text-sky-800 text-4xl' />
//       </Link>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <table className='w-full border-separate border-spacing-1'>
//           <thead className='bg-gray-100'>
//             <tr>
//               <th className='border border-gray-300 p-2 text-center'>No</th>
//               <th className='border border-gray-300 p-2 text-center'>Vulnerability Id</th>
//               <th className='border border-gray-300 p-2 text-center'>Reported Date</th>
//               <th className='border border-gray-300 p-2 text-center'>Subject</th>
//               <th className='border border-gray-300 p-2 text-center'>Document</th>
//               <th className='border border-gray-300 p-2 text-center'>Vulnerability Status</th>
//               <th className='border border-gray-300 p-2 text-center'>Action</th>
//               <th className='border border-gray-300 p-2 text-center'>Action Status</th>
//               <th className='border border-gray-300 p-2 text-center'>Operations</th>
//             </tr>
//           </thead>
//           <tbody className='bg-white'>
//             {book?.reportDetail?.length > 0 ? (
//               book.reportDetail.flatMap((detail) => (
//                 <tr key={detail._id} className='h-12 even:bg-gray-50'>
//                   <td className='border border-gray-300 p-2 text-center'>{serialNumber++}</td>
//                   <td className='border border-gray-300 p-2 text-center'>{detail.vulId || 'N/A'}</td>
//                   <td className='border border-gray-300 p-2 text-center'>
//                     {detail.reportedDate ? new Date(detail.reportedDate).toLocaleDateString() : 'N/A'}
//                   </td>
//                   <td className='border border-gray-300 p-2 text-center'>{detail.subject || 'N/A'}</td>
//                   <td className='border border-gray-300 p-2 text-center'>{detail.document || 'N/A'}</td>
//                   <td className='border border-gray-300 p-2 text-center'>{detail.vulStatus || 'N/A'}</td>
//                   <td className='border border-gray-300 p-2 text-center'>{detail.action || 'N/A'}</td>
//                   <td className='border border-gray-300 p-2 text-center'>{detail.actionStatus || 'N/A'}</td>
//                   <td className='border border-gray-300 p-2 text-center'>
//                     <div className='flex justify-center gap-x-4'>
//                       <Link to={`/books/details/${book._id}`}>
//                         <BsInfoCircle className='text-2xl text-green-800' />
//                       </Link>
//                       <Link to={`/books/edit/${book._id}`}>
//                         <AiOutlineEdit className='text-2xl text-yellow-600' />
//                       </Link>
//                       <Link to={`/books/delete/${book._id}/reportDetail/${detail._id}`}>
//                         <MdOutlineDelete className='text-2xl text-red-600' />
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan='9' className='text-center'>No report details found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ShowBook;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import BackButton from '../src/components/BackButton';
import Spinner from '../src/components/Spinner';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md';

const ShowBook = () => {
  const [reports, setReports] = useState([]); // Store the reports data
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}/filteredReports`)
      .then((response) => {
        setReports(response.data); // Assuming the response contains the reports data
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  let serialNumber = 1;

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book Details</h1>
      <Link to={`/books/${id}/reportDetail`}>
        <MdOutlineAddBox className='text-sky-800 text-4xl' />
      </Link>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-1'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-300 p-2 text-center'>No</th>
              <th className='border border-gray-300 p-2 text-center'>Vulnerability Id</th>
              <th className='border border-gray-300 p-2 text-center'>Reported Date</th>
              <th className='border border-gray-300 p-2 text-center'>Subject</th>
              <th className='border border-gray-300 p-2 text-center'>Document</th>
              <th className='border border-gray-300 p-2 text-center'>Vulnerability Status</th>
              <th className='border border-gray-300 p-2 text-center'>Action</th>
              <th className='border border-gray-300 p-2 text-center'>Action Status</th>
              <th className='border border-gray-300 p-2 text-center'>Operations</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <tr key={report._id} className='h-12 even:bg-gray-50'>
                  <td className='border border-gray-300 p-2 text-center'>{serialNumber++}</td>
                  <td className='border border-gray-300 p-2 text-center'>{report.vulId}</td>
                  <td className='border border-gray-300 p-2 text-center'>
                    {new Date(report.reportedDate).toLocaleDateString()}
                  </td>
                  <td className='border border-gray-300 p-2 text-center'>{report.subject}</td>
                  <td className='border border-gray-300 p-2 text-center'>{report.document}</td>
                  <td className='border border-gray-300 p-2 text-center'>{report.vulStatus}</td>
                  <td className='border border-gray-300 p-2 text-center'>{report.action}</td>
                  <td className='border border-gray-300 p-2 text-center'>{report.actionStatus}</td>
                  <td className='border border-gray-300 p-2 text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/books/details/${report._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800' />
                      </Link>
                      <Link to={`/books/edit/${report._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                      </Link>
                      <Link to={`/books/delete/${report._id}/reportDetail/${report._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='9' className='text-center'>No report details found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowBook;
