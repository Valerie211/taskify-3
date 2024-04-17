import React from 'react';
import LineChart from '../Charts/LineChart';
import DoughNutChat from "../Charts/DoughNut"
import { RiCalendarCheckLine } from "react-icons/ri"

const DashboardCards = ({title}) => {
    const data_1 = {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [
          {
            label: "yes",
            data: [30, 59, 80, 89,],
            fill: false,
            borderWidth: 1,
            pointRadius: 0
          },
        ],
      };
      const textCenter = {
        "id":"textCenter",
        beforeDatasetsDraw(chart,args,pluginOptions){
            const {ctx , data} = chart
            ctx.save()

            ctx.font = "bolder 10px sans-serif"
            ctx.fillStyle = "black"
            ctx.textAlign = "center"
            ctx.textBaseLine = "middle"
            ctx.fillText(`completed :  ${data_1.datasets[0].data[0]}`,chart.getDatasetMeta(0).data[0].x,chart.getDatasetMeta(0).data[0].y)
        }
      }
      const option={
        plugins: {
            legend: {
              position: "right"
            }
          },
            responsive: true, 
        
        }
      
  return (
    <div className='w-1/4 flex gap-4 item h-28 py-4 px-2 bg-white shadow-sm'>
     <div className='w-full h-full '>
     <DoughNutChat data={data_1} options={option} plugins={textCenter}  />
     </div>
      
    <h2 className='text-sm text-nowrap'>All Projects</h2>
    </div>
  );
}

export default DashboardCards;
