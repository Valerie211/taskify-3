import { MdOutlineEdit } from "react-icons/md";
import { BiTrashAlt } from "react-icons/bi";
import { useState,useEffect } from "react";
import { CSVLink } from "react-csv";
import { updateTaskApi } from "../../utils/tasks";
import { toast } from "react-toastify";

const TeamMemberTaskTable = ({openForm,tasks,submitHandler,getTasks}) => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskStatuses, setTaskStatuses] = useState({});

  const handleClick = (taskId) => {
    openForm(taskId);
    setSelectedTaskId(taskId);
  };

  const handleStatusChange = async (taskId, selectedProgress) => {
    try {
      if (selectedProgress === "complete") {
        // Open form if status is "complete"
        handleClick(taskId);
      } else {
        const result = await updateTaskApi(taskId, selectedProgress);
        console.log(result);
        // Update task status in state
        setTaskStatuses((prevState) => ({
          ...prevState,
          [taskId]: selectedProgress,
        }));
        toast.success("Tasks status updated successfully")
        getTasks()
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  useEffect(() => {
    // Initialize task statuses when tasks change
    const initialStatuses = {};
    tasks.forEach((task) => {
      initialStatuses[task.id] = task.progress_status;
    });
    setTaskStatuses(initialStatuses);
  }, [tasks]);



  return (
    <div className="rounded-sm bg-white h-auto">
      <div className="text-sm flex items-center justify-between px-4 py-4">
        <h3 className="font-bold">Task</h3>
        <CSVLink data={tasks} className="bg-[#BBE2EC] text-[#40A2E3] py-2 px-2 mr-4 rounded-sm">Export Report</CSVLink>
      </div>
      <table className="w-full text-sm border-b">
           <thead>
           <tr className="bg-[#BBE2EC] py-4">
                <th className="bg-[#BBE2EC] py-4 px-2"><input type="checkbox"/></th>
                <th className="bg-[#BBE2EC] py-4 px-2">#</th>
                <th className="bg-[#BBE2EC] py-4 px-2">Name</th>
                <th className="bg-[#BBE2EC] py-4 px-2">Status</th>
                <th className="bg-[#BBE2EC] py-4 px-2">Start Date</th>
                <th className="bg-[#BBE2EC] py-4 px-2">End Date</th>
                <th className="bg-[#BBE2EC] py-4 px-2">Assigned to</th>
                <th className="bg-[#BBE2EC] py-4 px-2">Priority</th>
               
            </tr>
           </thead>
           <tbody>
        {
          tasks?.map((task,i)=>{
            const getStatus = () => {
              return taskStatuses[task.id] || task.progress_status;
            };
            return (
              <tr key={task.id}>
                <td className="text-center py-4 px-2"><input type="checkbox"/></td>
                <td className="text-center py-4 px-2">{i}</td>
                <td className="text-center py-4 px-2">
                <h3 className="text-xs">{task.title}</h3>
                <h4 className="text-xs uppercase">inv-100023456</h4>
                </td>
                <td className="text-center py-4 px-2">
                    <select  value={getStatus()}
                     onChange={(e) =>
                    handleStatusChange(task.id, e.target.value)
                  }>
                       <option value="complete">complete</option>
                        <option value="progress">in progress</option>
                        <option value="not_assigned">not started</option>
                    </select>
                </td>
                <td className="text-center py-4 px-2">{task.start_date}</td>
                <td className="text-center py-4 px-2">{task.due_date}</td>
                <td className="text-center py-4 px-2"><img/></td>
                <td className="text-center py-4 px-2">
                {/* <select>
                       <option>high</option>
                       <option>medium</option>
                       <option>low</option>
                    </select> */}
                    {
                      task.pri_status
                    }
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

export default TeamMemberTaskTable;
