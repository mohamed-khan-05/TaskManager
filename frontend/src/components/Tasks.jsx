import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Tasks = (props) => {
  const { globalEmail, tab, setTab } = props;
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendUrl}/tasks/${tab}`, {
        params: { email: globalEmail },
      })
      .then((res) => {
        setData(res.data.message);
        setLoading(false);
      });
  }, [tab, globalEmail]);
  return (
    <div className="bg-white w-[80vw] h-[100vh] overflow-auto">
      {!loading ? (
        <div className="flex flex-wrap w-[80vw]">
          {data.map((d, index) => {
            return (
              <div key={index}>
                <Card
                  globalEmail={globalEmail}
                  tab={tab}
                  setTab={setTab}
                  d={d}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Tasks;
