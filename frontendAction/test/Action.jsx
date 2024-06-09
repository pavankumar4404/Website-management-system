import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Action = () => {
  const { id } = useParams();
  const [vulnerability, setVulnerability] = useState(null);
  const [action, setAction] = useState("");
  const [status, setStatus] = useState("Opened");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/vulnerabilities/${id}`)
      .then((response) => {
        setVulnerability(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const actionData = {
      action,
      status,
    };

    axios
      .post(`http://localhost:5555/vulnerabilities/action/${id}`, actionData)
      .then((response) => {
        navigate(`/vulnerabilities/details/${vulnerability.website_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2 className="text-2xl mb-4">Action on reported Vulnerability</h2>
          <div className="mb-4">
            <p>Website URL: {vulnerability.website_url}</p>
            <p>Website ID: {vulnerability.website_id}</p>
            <p>Website Name: {vulnerability.website_name}</p>
            <p>Vulnerability ID: {vulnerability.vul_id}</p>
            <p>Department: {vulnerability.dept}</p>
            <p>Vulnerability Name: {vulnerability.vul_subject}</p>
            <p>Reported Date: {vulnerability.vul_date}</p>
            <p>Attachment File: {vulnerability.vul_report}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Action</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                maxLength="300"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Action status</label>
              <select
                className="border border-gray-300 p-2 w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Opened">Opened</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Action;
