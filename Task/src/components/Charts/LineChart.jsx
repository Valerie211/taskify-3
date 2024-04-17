import React from "react";
import { Line,Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

const LineChat = ({ data, options}) => {
  return <Line style={{  width: '50%', height: '50%' }} data={data} options={options} />;
};

export default LineChat;
