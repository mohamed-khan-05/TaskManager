import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Tasks from "../components/Tasks";
import Add from "../components/Add";

// Set axios global defaults here or in your app root (App.jsx)
axios.defaults.withCredentials = true;

const Home = () => {
  const [tab, setTab] = useState("Dashboard");
  const [add, setAdd] = useState(false);
  const [globalEmail, setGlobalEmail] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const handleLogout = () => {
    axios
      .post(`${backendUrl}/users/logout`)
      .then(() => {
        setGlobalEmail(""); // clear email on logout
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  useEffect(() => {
    axios
      .get(`${backendUrl}/users/login`)
      .then((response) => {
        if (response.data.loggedIn && response.data.user) {
          setGlobalEmail(response.data.user.email);
          // Avoid redirect loop by checking current path
          if (location.pathname !== `/home/${response.data.user.email}`) {
            navigate(`/home/${response.data.user.email}`);
          }
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Login check failed:", err);
        navigate("/");
      });
  }, [backendUrl, navigate, setGlobalEmail, location.pathname]);

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
