import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const backendURL = import.meta.env.VITE_BACKENDURL || "http://localhost:3001";

  const handleLogout = () => {
    axios.post(`${backendURL}/users/logout`).then((response) => {
      console.log(response);
      navigate("/");
    });
  };

  useEffect(() => {
    axios.get(`${backendURL}/users/login`).then((response) => {
      if (response.data.loggedIn && response.data.user) {
        setUsername(response.data.user.email);
      } else {
        setUsername("");
        navigate("/");
      }
    });

    axios
      .get(`${backendURL}/users`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [backendURL, navigate]);

  return (
    <div className="flex flex-col justify-center items-center w-[100vw]">
      <button
        className="fixed top-5 left-10 p-2 border-[2px] border-gray-800 rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
      <h1>Hello {username}</h1>
      {error && <p className="text-red-600">{error}</p>}
      {data.map((user, index) => (
        <div key={index} className="flex-col text-center w-[50%] h-[100%]">
          <div className="bg-blue-500 content-center rounded-full h-[50px] m-3">
            <h4>Email: {user.email}</h4>
          </div>
          <div className="bg-gray-400 content-center rounded-full h-[50px] m-3">
            <h4>Password: {user.password}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
