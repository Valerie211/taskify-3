import { MdOutlineEdit } from "react-icons/md";
import { BiTrashAlt } from "react-icons/bi";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { removeTaskApi } from "../../utils/tasks";
import { toast } from "react-toastify";
import { jwtDecode} from "jwt-decode"

const TaskTable = ({openForm,tasks,setTasks,handleEdit}) => {
  console.log("task",tasks)
  const user =  jwtDecode(JSON.parse(localStorage.getItem("token")))?.user_id
  const handleDelete =async(id)=>{
    console.log("task_id",id)
    try {
      const result = await removeTaskApi(id,user)
    console.log("res-del",result)
    if(result.status ===200){
    const updatedTask = tasks.filter((task,i)=> task.id !== id)
    setTasks(updatedTask)
    toast.success("tasks deleted successfully")
    }
    } catch (error) {
      toast.error(error)
    }
  }
  const handleEditTask =(task)=>{
    handleEdit(task)
  }
  return (
    <div className="rounded-sm bg-white h-auto">
      <div className="text-sm flex items-center justify-between px-4 py-4">
        <h3 className="font-bold">Task</h3>
        <CSVLink className="bg-[#BBE2EC] text-[#40A2E3] py-2 px-2 mr-4 rounded-sm" data={tasks}>Export Report</CSVLink>
      </div>
      <table className="w-full text-sm border-b">
           <thead>
           <tr className="bg-[#BBE2EC] py-4">
                <th className="bg-[#BBE2EC] py-4 px-2"><input type="checkbox"/></th>
                <th className="bg-[#BBE2EC] py-4 px-2">Name</th>
                <th className="bg-[#BBE2EC] py-4 px-2">Status</th>
                <th className="bg-[#BBE2EC] py-4 px-2">Start Date</th>
                <th className="bg-[#BBE2EC] py-4 px-2">End Date</th>
                <th className="bg-[#BBE2EC] py-4 px-2">Estimated Hour</th>
                <th className="bg-[#BBE2EC] py-4 px-2">Assigned to</th>
                <th className="bg-[#BBE2EC] py-4 px-2">Priority</th>
                <th className="bg-[#BBE2EC] py-4 px-2">Action</th>
            </tr>
           </thead>
           <tbody>
        {
          tasks.length > 0 && tasks.map((task,i)=>{
            return (
              <tr key={task.id}>
                <td className="text-center py-4 px-2"><input type="checkbox"/></td>
             
                <td className="text-center py-4 px-2">
                <h3 className="text-xs">{task.title}</h3>
                </td>
                <td className="text-center py-4 px-2">
                    {
                      task.progress_status ==="not_assigned"? "Not Started": task?.progress_status  === 'progress'? "Progress":task?.progress_status ==="completed" && "Completed"
                    }
                </td>
                <td className="text-center py-4 px-2">{task.start_date}</td>
                <td className="text-center py-4 px-2">{task.due_date}</td>
                <td className="text-center py-4 px-2">{task.due_time}</td>
                <td className="text-center py-4 px-2"><img/></td>
                <td className="text-center py-4 px-2">
                {
                  task.pri_status
                }
                </td>
                <td className="text-center py-4 px-2 flex gap-1">
                    <button onClick={()=>handleEditTask(task)} className="bg-blue-400 text-white py-1 rounded-sm px-2">
                      <MdOutlineEdit/>  
                    </button>
                    <button onClick={()=>handleDelete(task.id)} className="bg-red-400 text-white py-1 rounded-sm px-2">
                        <BiTrashAlt/>
                    </button>
                </td>
            </tr>
            )
          })
        }
           </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
