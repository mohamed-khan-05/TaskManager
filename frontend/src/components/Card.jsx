import React, { useState } from "react";
import axios from "axios";

// media
import { FaTrashAlt } from "react-icons/fa";

const Card = (props) => {
  const [count, setCount] = useState(0);
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const { globalEmail, tab, setTab, d } = props;
  const { StartDate } = d;
  const { EndDate } = d;
  let formattedDate1 = "";
  let formattedDate2 = "";
  if (StartDate) {
    const date1 = new Date(StartDate);
    formattedDate1 = date1.toISOString().split("T")[0];
  }
  if (EndDate) {
    const date2 = new Date(EndDate);
    formattedDate2 = date2.toISOString().split("T")[0];
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#ADF9D3] text-[#318B61]";
      case "Pending":
        return "bg-[#FAF396] text-[#A3783C]";
      case "In Progress":
        return "bg-[#BFDAFB] text-[#5252B3]";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const handleDelete = () => {
    let con = window.confirm("Are you sure you want to delete this Task ?");
    if (con) {
      axios
        .delete(`${backendUrl}/tasks/delete`, {
          data: { id: d.id },
        })
        .then(() => {
          let temp = tab;
          setTab("None");
          setTimeout(() => {
            setTab(temp);
          }, 100);
        })
        .catch((error) => {
          console.error("There was an error deleting the task!", error);
        });
    }
  };

  const handleStatus = () => {
    let newStatus = "";
    switch (d.status) {
      case "Completed":
        newStatus = "Pending";
        break;
      case "Pending":
        newStatus = "In Progress";
        break;
      case "In Progress":
        newStatus = "Completed";
        break;
      default:
        newStatus = "Pending";
    }

    axios
      .put(`${backendUrl}/tasks/updateStatus`, {
        id: d.id,
        status: newStatus,
      })
      .then(() => {
        d.status = newStatus;
        setCount((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div
      id="shadow"
      className="bg-white min-h-[150px] w-[300px] p-2 m-5 rounded-xl"
    >
      <div
        className={`text-center text-[1.3rem] py-4 px-2 break-words mb-2 ${getStatusColor(
          d.status
        )}`}
      >
        <h1 className="font-bold">{d.task}</h1>
      </div>
      <div className="mb-2">
        <h1>{d.description}</h1>
      </div>
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold">Start Date</h1>
          <h1>{formattedDate1}</h1>
        </div>
        <div>
          <h1 className="font-bold">End Date</h1> <h1>{formattedDate2}</h1>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <button
          onClick={() => {
            handleDelete();
          }}
          className="text-red-500 cursor-pointer"
        >
          <FaTrashAlt />
        </button>
        <button
          onClick={() => {
            handleStatus();
          }}
          className={`cursor-pointer border px-3 py-1 rounded-md ${getStatusColor(
            d.status
          )}`}
        >
          {d.status}
        </button>
      </div>
    </div>
  );
};

export default Card;
