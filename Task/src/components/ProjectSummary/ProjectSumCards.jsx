import { useNavigate } from "react-router-dom";
import user from "../../assets/user.png"
import { MdDelete } from "react-icons/md";
import { getProjectApi, removeTProjectApi, updateProjectApi } from "../../utils/projects";
import { toast } from "react-toastify";
import { useEffect,useState } from "react";


const ProjectSumCards = ({ title,created_at,due_date,description,progress,id,handleDelete,getProject }) => {
  const nav = useNavigate()
  const [selectedProgress,setSelectedProgress] = useState(progress)

  useEffect(()=>{
    setSelectedProgress(progress)
  },[progress])
  const updateProgressStatus =async(id,payload)=>{
    try {
      const result = await updateProjectApi(id,payload)
      console.log("result",result)
      if(result.status ===200){
        setSelectedProgress(payload)
         getProject()
        toast.success(result?.data?.message)
        
      }
    } catch (error) {
      toast.error(error)
    }
  }
 
  return (
    <div className="w-1/4 h-[340px] mb-4  p-4 bg-white rounded-sm cursor-pointer" >
      <div className="flex  justify-between  ">
      <h2 className="text-sm  font-bold mb-4 text-gray-500">{title}</h2>
      <MdDelete  size={24} onClick={()=>handleDelete()} style={{color:"red"}} className=" "/>     
      </div>
      <hr />
      <div className="mt-4 mb-4 flex items-center">
        <img src={user} className="w-5 h-5" />
        <p className="ml-3 text-sm">{created_at}</p>
      </div>
      <h3 className="mb-4 text-sm">{description}</h3>
      <h3 className="mb-4 text-sm font-bold">Team</h3>
      <img src={user} className="w-5 h-5" />
      <div className="mt-4 ">
        <div className="w-full h-1 bg-gray-200 rounded-full relative">
          <div className="h-full bg-purple-500 rounded-full absolute top-0" style={{ width: "50%" }}></div>
        </div>

      </div>
      <hr/>
      <div className="flex items-center gap-3">
        <h3 className="text-xs flex text-gray-400 mt-4 mb-4">Due: <span className="text-purple-500">{due_date}</span></h3>
        {/* <h3 className="text-xs flex text-gray-400">status: <span className="text-purple-500">{progress}</span></h3> */}
      </div>
      <select value={selectedProgress} onChange={(e)=>updateProgressStatus(id,e.target.value)} className="text-sm border ">
        <option value={"progress"}>In progress</option>
        <option value={"complete"}>Complete</option>
      </select>
      <button className="mt-4 block p-1 text-white rounded-sm bg-blue-300" onClick={() => nav(`/task/${id}`)}>
        Go to task
      </button>
    </div>
  );
}

export default ProjectSumCards;
