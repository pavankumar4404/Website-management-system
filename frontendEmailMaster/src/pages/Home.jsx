import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton1 from "../components/BackButton1";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8800/emails")
      .then((response) => {
        setEmails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  let serialNumber = 1;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
      <BackButton1/>
        <h1 className="text-3xl my-8">Email Entry Form</h1>
        <Link to="/emails/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-1">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 text-center">No</th>
              <th className="border border-gray-300 p-2 text-center">Employee ID</th>
              <th className="border border-gray-300 p-2 text-center">Email Type</th>
              <th className="border border-gray-300 p-2 text-center">Email ID</th>
              <th className="border border-gray-300 p-2 text-center">Email Detail</th>
              <th className="border border-gray-300 p-2 text-center">Operations</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {emails.length > 0 ? (
              emails.map((email) => (
                <tr key={email.emp_id} className="h-12 even:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{serialNumber++}</td>
                  <td className="border border-gray-300 p-2 text-center">{email.emp_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{email.email_type}</td>
                  <td className="border border-gray-300 p-2 text-center">{email.email_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{email.email_detail}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/emails/edit/${email.email_id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/emails/delete/${email.email_id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-gray-300 p-2 text-center">
                  No emails found.
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
