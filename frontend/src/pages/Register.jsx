import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

// media
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState("password");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      isAdmin: false,
    };
    axios
      .post("http://localhost:3001/users", data)
      .then(() => {
        toast.success("User Created successfully");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        toast.error(Object.values(error.response.data).flat().join(", "));
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-gradient-to-t from-green-600 to-blue-600">
        <div className="flex flex-col items-center pt-[3rem] bg-white w-[25vw] h-[70vh] rounded-lg">
          <h1 className="text-[1.5rem]">Register</h1>
          <span>
            <MdOutlineEmail className="translate-y-[3.3rem] translate-x-[-10px]" />
            <input
              className="w-[300px] border-b-2 my-[1.5rem] px-4 py-2 focus:outline-none focus:border-b-slate-500"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
            />
          </span>
          <span>
            <RiLockPasswordLine className="translate-y-[3.3rem] translate-x-[-10px]" />
            <input
              className="w-[300px] border-b-2 my-[1.5rem] px-4 py-2 focus:outline-none focus:border-b-slate-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={hidden}
              placeholder="Password"
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
            Register
          </button>
          <span className="mt-8 translate-x-[-50px]">
            Already have an account ?
            <a href="/" className="text-blue-600 ml-3">
              Login
            </a>
          </span>
        </div>
      </div>

      <ToastContainer />
    </form>
  );
};

export default Register;
