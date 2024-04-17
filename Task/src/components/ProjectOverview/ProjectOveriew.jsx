import { useState,useEffect } from "react";
import LineChat from "../Charts/LineChart";

const ProjectOverview = () => {
  const [barChartData, setBarData] = useState();
  const data = {
    labels: [
      "March 10",
      "March 11",
      "March 12",
      "March 13",
      "March 14",
      "March 15",
    ],
    datasets: [
      {
        label: "",
        data: [40, 20, 60, 70, 100, 80],
        backgroundColor: ["#1F2B5B"],
        borderColor: ["rgb(201, 203, 207)"],
        borderWidth: 1,
        barThickness: 10,
        borderRadius: 10,
      },
    ],
  }

  useEffect(() => {
    setBarData({
      labels: [
        "Sep 10",
        "Sep 11",
        "Sep 12",
        "Sep 13",
        "Sep 14",
        "Sep 15",
        "Sep 16",
      ],
      datasets: [
        {
          label: "",
          data: [40, 20, 60, 140, 100, 120, 80],
          backgroundColor: ["#1F2B5B"],
          borderColor: ["rgb(201, 203, 207)"],
          borderWidth: 1,
          barThickness: 10,
          borderRadius: 10,
        },
      ],
    })
  }, [])
  return (
    <div className='w-2/3 bg-white h-[400px] p-4'>
      <div className="flex justify-between">
        <h2 className="text-sm">Project Overview</h2>
        <div className="flex gap-2">
            <button className="bg-blue-400 text-white  w-20 text-sm rounded-md ">week</button>
            <button  className=" bg-gray-100 text-blue-400 py-1 w-20 text-sm rounded-md ">month</button>
            <button  className="bg-gray-100 text-blue-400 py-1 px-4 text-sm rounded-md ">year</button>
            <button  className="bg-gray-100 text-blue-400 py-1 px-4 text-sm rounded-md ">All</button>
        </div>
      </div>
      <LineChat data={data}  />
    </div>
  );
}

export default ProjectOverview;
