import { useEffect, useState } from "react";
import DashboardCards from "../Cards/DashboardCards";
import DashboardLineCard from "../Cards/DashboardLineCard";
import DoughnutCard from "../Cards/DoughnutCard"
import { getProjectApi } from "../../utils/projects";
import { toast } from "react-toastify";


const Dashboard = () => {
  const [data,setData] = useState(null)
  const [loading,setLoading]= useState(false)
  
  const getProject = async () => {
    setLoading(true)
    try{
    const project = await getProjectApi()
    console.log("project------>",project)
    if (project.status === 200) {
        setData(project)
       
        setLoading(false)
   }
  }catch(error){
    console.log('Error:', error);
    toast.error("error")
  }
}
  
console.log("data",data)

useEffect(() => {
     getProject()
}, [])

  return (
    <div className="flex gap-2">
      <DashboardCards title="Total Projects" num={data?.data?.total_project}/>
      <DashboardCards title="Total Tasks" num={data?.data?.total_task}/>
      <DashboardCards title="Total Completed" num={data?.data?.total_completed}/>

    </div>
  );
}

export default Dashboard;
