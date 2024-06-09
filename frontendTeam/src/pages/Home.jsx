import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton1 from "../components/BackButton1";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8800/teams")
      .then((response) => {
        setTeams(response.data);  // Ensure the correct data is being set
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
        <h1 className="text-3xl my-8">Team Management</h1>
        <Link to="/teams/create">
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
              <th className="border border-gray-300 p-2 text-center">Team ID</th>
              <th className="border border-gray-300 p-2 text-center">EMPLOYEE ID</th>
              <th className="border border-gray-300 p-2 text-center">Operations</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {teams.length > 0 ? (
              teams.map((team) => (
                <tr key={team.team_id} className="h-12 even:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{serialNumber++}</td>
                  <td className="border border-gray-300 p-2 text-center">{team.team_id}</td>
                  <td className="border border-gray-300 p-2 text-center">{team.emp_id}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/teams/edit/${team.emp_id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/teams/delete/${team.emp_id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 p-2 text-center">
                  No teams found.
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
