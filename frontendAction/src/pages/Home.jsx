import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton1 from "../components/BackButton1";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";

const Home = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8800/vulnerabilities")
      .then((response) => {
        setVulnerabilities(response.data);
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
        <h1 className="text-3xl my-8">Vulnerability Details</h1>
        <Link to="/vulnerabilities/create">
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
              <th className="border border-gray-300 p-2 text-center">Website ID</th>
              <th className="border border-gray-300 p-2 text-center">Vulnerability ID</th>
              <th className="border border-gray-300 p-2 text-center">Vulnerability Source</th>
              <th className="border border-gray-300 p-2 text-center">Vulnerability Subject</th>
              <th className="border border-gray-300 p-2 text-center">Reported Date</th>
              <th className="border border-gray-300 p-2 text-center">Document Path</th>
              <th className="border border-gray-300 p-2 text-center">Reference Link</th>
              <th className="border border-gray-300 p-2 text-center">Status</th>
              <th className="border border-gray-300 p-2 text-center">Operations</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {vulnerabilities.map((vulnerability) => (
              <tr key={vulnerability.vulnerability_id} className="h-12 even:bg-gray-50">
                <td className="border border-gray-300 p-2 text-center">
                  {serialNumber++}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {vulnerability.website_id}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {vulnerability.vulnerability_id}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {vulnerability.vulnerability_source}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {vulnerability.vulnerability_subject}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {new Date(vulnerability.reported_date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {vulnerability.document_path}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <a href={vulnerability.reference_link} target="_blank" rel="noopener noreferrer">
                  {vulnerability.reference_link}
                  </a>
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {vulnerability.status}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/vulnerabilities/action/${vulnerability.vulnerability_id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/vulnerabilities/edit/${vulnerability.vulnerability_id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
