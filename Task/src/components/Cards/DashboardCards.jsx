import React from 'react';
import LineChart from '../Charts/LineChart';
import { RiCalendarCheckLine } from "react-icons/ri"

const DashboardCards = ({title,num}) => {
    const data_1 = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May","Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "",
            data: [30, 59, 80, 89, 100, 150, 200,30, 59, 80, 89, 100, 150, 200],
            fill: false,
            borderWidth: 1,
            pointRadius: 0
          },
        ],
      };
      const option={
        plugins: {
            legend: {
              display: false
            }
          },
            responsive: true, 
        scales: {
            x: {
              display: false 
            },
            y: {
                display: false 
              }
        }}
      
  return (
    <div className='w-1/3 flex flex-col gap-10 h-28 py-4 px-2 bg-white rounded-sm shadow-sm'>
        <div className='flex gap-4 items-center  justify-center'>
            {/* <button className='bg-blue-200 py-2 px-2 rounded-sm'>
                <RiCalendarCheckLine size={24} className='text-blue-400'/>
            </button> */}
            <div className='flex flex-col gap-2 items-center justify-center'>
                <h2 className="text-xl font-bold">{title}</h2>
                <h2 className="font-bold text-2xl text-center">{num}</h2>
            </div>
          
        </div>
   
    </div>
  );
}

export default DashboardCards;
