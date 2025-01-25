import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router";

const Add = () => {
  const [task, setTask] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState("Completed");
  let param = useParams("email");

  const handleAdd = () => {
    if (!task || !status) {
      return toast.error("Enter Task");
    }
    const email = param.email;
    let s = document.getElementById("start").value;
    let e = document.getElementById("end").value;
    if (!e) {
      e = getTodayDate();
    }
    if (!s) {
      s = getTodayDate();
    }
    const d = {
      task: task,
      description: description,
      status: status,
      StartDate: s,
      EndDate: e,
      UserEmail: email,
    };
    axios.post("http://localhost:3001/tasks/add", d).then((res) => {
      toast.success(res.data.message.text);
    });
    setTask("");
    setDescription("");
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
  };
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  return (
    <div className="w-[30vw] h-[50vh] flex flex-col text-[1.2rem] text-white gap-4 my-[100px] mx-[200px] bg-[#00abc1] p-10 rounded-md">
      <div>
        <div className="flex flex-col">
          <label htmlFor="">Title</label>
          <input
            className="border-b-1 mb-4 border-b-white focus:outline-none focus:border-b-black"
            onChange={(e) => {
              setTask(e.target.value);
            }}
            placeholder="Task Title"
            id="title"
            type="text"
          />

          <label htmlFor="">Description</label>
          <input
            className="border-b-1 mb-2 border-b-white focus:outline-none focus:border-b-black"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Task Description"
            id="desc"
            type="text"
          />
        </div>
      </div>

      <div>
        <div className="cursor-pointer">
          <input
            className="cursor-pointer"
            onClick={() => {
              setStatus("Completed");
            }}
            defaultChecked={true}
            type="radio"
            name="status"
            id="Completed"
          />
          <label className="pl-4 cursor-pointer" htmlFor="Completed">
            Completed
          </label>
        </div>

        <div className="cursor-pointer">
          <input
            className="cursor-pointer"
            onClick={() => {
              setStatus("Pending");
            }}
            type="radio"
            name="status"
            id="Pending"
          />
          <label className="pl-4 cursor-pointer" htmlFor="Pending">
            Pending
          </label>
        </div>

        <div className="cursor-pointer">
          <input
            className="cursor-pointer"
            onClick={() => {
              setStatus("In Progress");
            }}
            type="radio"
            name="status"
            id="InProgress"
          />
          <label className="pl-4 cursor-pointer" htmlFor="InProgress">
            InProgress
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="start">
            Start Date
          </label>
          <input
            className="cursor-pointer"
            defaultValue={getTodayDate()}
            type="date"
            id="start"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="end">
            End Date
          </label>
          <input className="cursor-pointer" type="date" id="end" />
        </div>
      </div>

      <button
        className="cursor-pointer self-start border px-8 py-1 rounded-md"
        onClick={() => {
          handleAdd();
        }}
      >
        Add
      </button>
      <div className="text-[1rem]">
        <ToastContainer />
      </div>
    </div>
  );
};

export default Add;
