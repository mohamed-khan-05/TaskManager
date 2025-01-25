import React from "react";

// media
import { FaTasks } from "react-icons/fa";

const Sidebar = (props) => {
  const { setTab, setAdd } = props;
  return (
    <div className="bg-[#45B3E0] w-[20vw] text-white flex flex-col">
      <div className="flex items-center gap-2 text-[1.6rem] my-5 ml-[80px]">
        <FaTasks />
        <h1>Task Manager</h1>
      </div>
      <div className="cursor-pointer mt-[80px] text-[1.2rem] font-semibold h-[23vh] flex flex-col">
        <h1
          className="border-b-1 pl-[80px] py-4"
          onClick={() => {
            setTab("Dashboard");
            setAdd(false);
          }}
        >
          All
        </h1>
        <h1
          className="border-b-1 pl-[80px] py-4"
          onClick={() => {
            setTab("Completed");
            setAdd(false);
          }}
        >
          Completed
        </h1>
        <h1
          className="border-b-1 pl-[80px] py-4"
          onClick={() => {
            setTab("Pending");
            setAdd(false);
          }}
        >
          Pending
        </h1>
        <h1
          className="border-b-1 pl-[80px] py-4"
          onClick={() => {
            setTab("In Progress");
            setAdd(false);
          }}
        >
          In Progress
        </h1>
        <h1
          className="border-b-1 pl-[80px] py-4"
          onClick={() => {
            setAdd(true);
          }}
        >
          Add New Task
        </h1>
      </div>
    </div>
  );
};

export default Sidebar;
