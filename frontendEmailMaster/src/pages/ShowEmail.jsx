import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowEmail = () => {
  const [email, setEmail] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/emails/${id}`)
      .then((response) => {
        setEmail(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Email</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{email._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Employee ID</span>
            <span>{email.emp_id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Email Type</span>
            <span>{email.email_type}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(email.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(email.updatedAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Email Details</span>
            <div className='flex flex-col gap-2'>
              {email.emailDetail && email.emailDetail.length > 0 ? (
                email.emailDetail.map((detail, index) => (
                  <div key={index} className='border rounded p-2'>
                    <div>
                      <span className='font-semibold'>Email ID:</span> {detail.email_id}
                    </div>
                    <div>
                      <span className='font-semibold'>Email Detail:</span> {detail.email_detail}
                    </div>
                  </div>
                ))
              ) : (
                <span>No email details found</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowEmail;
