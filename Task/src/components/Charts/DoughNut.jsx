import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

const DoughNutChat = ({ data, options, plugins}) => {
  return <Doughnut  plugins={[plugins]} data={data} options={options} />;
};

export default DoughNutChat;
