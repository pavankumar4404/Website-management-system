import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/vulnerabilities/${id}`)
      .then((response) => {
        setWebsite(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2 className="text-2xl mb-4">Website Details</h2>
          <div className="mb-4">
            <p>Website URL: {website.website_url}</p>
            <p>Website Name: {website.website_name}</p>
            <p>HOD Name: {website.hod}</p>
            <p>Opened: {website.vulDetails.filter(v => v.vul_status === 'Opened').length}</p>
            <p>IP Address: {website.ip_addr}</p>
            <p>Department: {website.dept}</p>
            <p>Location: {website.loc}</p>
            <p>SSL: {website.ssl ? 'Y' : 'N'}</p>
            <p>Security Audit: {website.sec_audit ? 'Y' : 'N'}</p>
            <p>OS: {website.os}</p>
          </div>

          <h2 className="text-2xl mb-4">List of Vulnerabilities</h2>
          <table className="w-full border-separate border-spacing-1">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 text-center">No</th>
                <th className="border border-gray-300 p-2 text-center">Vulnerability ID</th>
                <th className="border border-gray-300 p-2 text-center">Reported Date</th>
                <th className="border border-gray-300 p-2 text-center">Subject</th>
                <th className="border border-gray-300 p-2 text-center">Report</th>
                <th className="border border-gray-300 p-2 text-center">Status</th>
                <th className="border border-gray-300 p-2 text-center">Action</th>
                <th className="border border-gray-300 p-2 text-center">Operations</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {website.vulDetails.map((vul, index) => (
                <tr key={vul._id} className="h-12 even:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 p-2 text-center">{vul.vul_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{vul.vul_date}</td>
                  <td className="border border-gray-300 p-2 text-center">{vul.vul_subject}</td>
                  <td className="border border-gray-300 p-2 text-center">{vul.vul_report}</td>
                  <td className="border border-gray-300 p-2 text-center">{vul.vul_status}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {vul.vul_status === "Opened" ? (
                      <Link to={`/vulnerabilities/action/${vul._id}`} className="text-blue-600">
                        Proceed
                      </Link>
                    ) : (
                      "Closed"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Details;
