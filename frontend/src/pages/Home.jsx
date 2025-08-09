import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Tasks from "../components/Tasks";
import Add from "../components/Add";

const Home = () => {
  const [tab, setTab] = useState("Dashboard");
  const [add, setAdd] = useState(false);
  const [globalEmail, setGlobalEmail] = useContext(Context);
  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKENDURL || "http://localhost:3001";

  const handleLogout = () => {
    axios.post(`${backendURL}/users/logout`).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    axios.get(`${backendURL}/users/login`).then((response) => {
      if (response.data.loggedIn && response.data.user) {
        setGlobalEmail(response.data.user.email);
        navigate(`/home/${response.data.user.email}`);
      } else {
        navigate("/");
      }
    });
  }, [backendURL, navigate, setGlobalEmail]);

  return (
    <div>
      <button
        className="fixed z-[1] bottom-5 left-5 p-2 border-1 bg-white border-[#00388b] rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="w-[100vw] h-[100vh] bg-white flex">
        <Sidebar setAdd={setAdd} setTab={setTab} />
        {add ? (
          <Add />
        ) : (
          <Tasks
            add={add}
            globalEmail={globalEmail}
            tab={tab}
            setTab={setTab}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
