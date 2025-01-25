import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../App";
import axios from "axios";

// media
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const Login = () => {
  axios.defaults.withCredentials = true;
  const [globalEmail, setGlobalEmail] = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState("password");
  let isAdmin = false;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3001/users/login", data)
      .then(async (response) => {
        toast.success("Login Successful");
        isAdmin = response.data.isAdmin;
        setEmail("");
        setPassword("");
        await setGlobalEmail(email);
        setTimeout(() => {
          if (isAdmin) {
            navigate("/users");
          } else {
            navigate(`/home/${email}`);
          }
        }, 1000);
      })
      .catch((error) => {
        toast.error(Object.values(error.response.data).flat().join(", "));
      });
  };
  useEffect(() => {
    axios.get("http://localhost:3001/users/login").then((response) => {
      if (response.data.loggedIn && response.data.user) {
        if (response.data.user.isAdmin) {
          navigate("/users");
        } else {
          navigate(`/home/0`);
        }
      }
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-gradient-to-t from-green-600 to-blue-600">
        <div className="flex flex-col items-center pt-[3rem] bg-white w-[25vw] h-[70vh] rounded-lg">
          <h1 className="text-[1.5rem]">Login</h1>
          <span>
            <MdOutlineEmail className="translate-y-[3.3rem] translate-x-[-10px]" />
            <input
              className="w-[300px] border-b-2 my-[1.5rem] px-4 py-2 focus:outline-none focus:border-b-slate-500"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </span>
          <span>
            <RiLockPasswordLine className="translate-y-[3.3rem] translate-x-[-10px]" />
            <input
              className="w-[300px] border-b-2 my-[1.5rem] px-4 py-2 focus:outline-none focus:border-b-slate-500"
              type={hidden}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="absolute"
              type="button"
              onClick={() => {
                setHidden(hidden === "password" ? "text" : "password");
              }}
            >
              {hidden === "password" ? (
                <BiHide className="translate-x-[-20px] translate-y-[33px] size-[20px]" />
              ) : (
                <BiShow className="translate-x-[-20px] translate-y-[33px] size-[20px]" />
              )}
            </button>
          </span>

          <button
            className="rounded-full w-[300px] h-[35px] bg-gradient-to-tr from-blue-500 to-green-600 text-white font-bold"
            type="submit"
          >
            Login
          </button>
          <span className="mt-8 translate-x-[-50px]">
            Need an account ?
            <a href="/register" className="text-blue-600 ml-3">
              Register
            </a>
          </span>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Login;
