

import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton1 from "../components/BackButton1";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8800/emps")
      .then((response) => {
        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setEmployees(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          setEmployees(response.data.data);
        } else {
          setEmployees([]);
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
    <div className="p-4">
      <div className="flex justify-between items-center">
      <BackButton1/>
        <h1 className="text-3xl my-8">Employee List</h1>
        <Link to="/employees/create">
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
              <th className="border border-gray-300 p-2 text-center">Name</th>
              <th className="border border-gray-300 p-2 text-center">Designation ID</th>
              <th className="border border-gray-300 p-2 text-center">Email</th>
              <th className="border border-gray-300 p-2 text-center">Mobile No</th>
              <th className="border border-gray-300 p-2 text-center">Location ID</th>
              <th className="border border-gray-300 p-2 text-center">IP Phone</th>
              <th className="border border-gray-300 p-2 text-center">Emergency Contact</th>
              <th className="border border-gray-300 p-2 text-center">State Code</th>
              <th className="border border-gray-300 p-2 text-center">District Code</th>
              <th className="border border-gray-300 p-2 text-center">Employee Type</th>
              <th className="border border-gray-300 p-2 text-center">Operations</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee._id || employee.emp_id} className="h-12 even:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{serialNumber++}</td>
                  <td className="border border-gray-300 p-2 text-center">{employee.emp_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{employee.emp_name}</td>
                  <td className="border border-gray-300 p-2 text-center">{employee.designation_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{employee.name_based_email_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{employee.mobile_no}</td>
                  <td className="border border-gray-300 p-2 text-center">{employee.posting_location_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{employee.ip_phone}</td>
                  <td className="border border-gray-300 p-2 text-center">{employee.emergency_contact_no}</td>
                  <td className="border border-gray-300 p-2 text-center">{employee.state_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{employee.district_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{employee.emp_type}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="flex justify-center gap-x-4">
                      
                      <Link to={`/employees/edit/${employee.emp_id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/employees/delete/${employee.emp_id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="border border-gray-300 p-2 text-center">
                  No employees found.
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

