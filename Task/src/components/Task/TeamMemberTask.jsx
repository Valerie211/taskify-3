import { useState,useEffect } from "react";
import Cards from "../Cards/Cards";
import TaskTable from "./TaskTable";
import { RxDoubleArrowRight } from "react-icons/rx";
import { RxDoubleArrowLeft } from "react-icons/rx";
import AddNewTaskForm from "./AddNewTaskForm";
import { AiFillAppstore } from "react-icons/ai";
import ReflectionForm from "../Reflections/ReflectionForm";
import {getTaskApiById, updateTaskApi} from "../../utils/tasks"
import {toast} from "react-toastify"
import {useParams} from  "react-router-dom"
import TeamMemberTaskTable from "./TeamMemberTaskTable";
import ReflectionFormTeam from "../Reflections/ReflectionForManager";


const TeamMemberTask = () => {
    const [open,setOpen] =useState(false)
    const [taskId,setTaskId] = useState(null)
    const [openReflection,setOpenReflection] = useState(false)
    const [data,setData] = useState(null)
    const [taskList,setTaskList] = useState([])
    const [loading,setLoading] = useState(false)
    const {project_id} = useParams()
    console.log("id",project_id)

    const openReflectionForm =(task_id)=>{
        setTaskId(task_id)
        setOpenReflection(!openReflection)
    }
    const updateTaskProgress = async () => {
        try {
            // Update task status to "complete" after form submission
            const result = await updateTaskApi(taskId, "complete");
            console.log(result);
            // Update task list
            const updatedTaskList = taskList.map((task) => {
                if (task.id === taskId) {
                    return { ...task, progress_status: "complete" };
                }
                return task;
            });
            setTaskList(updatedTaskList);
            getTasks();
        } catch (error) {
            console.error("Error updating task status:", error);
            toast.error("error occurred") 
        }
    };
    const getTasks =async()=>{
        setLoading(true)
        try{
            const result = await getTaskApiById(project_id)
            console.log("tasks-results",result.data)
            if(result.status === 200){
                setData(result?.data)
                setTaskList(result?.data.task_list)
                setLoading(false)
            }

        }catch(error){
            console.log(error)
            toast.error(error)
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        getTasks()
    },[project_id])
   
    return (
        <div className="px-4 relative">
            <div className="flex justify-between mt-4 relative">
            <h2 className="mt-4">Task Summary</h2>
            <div className="flex ml-auto gap-2 ">
                <button className="bg-black w-12 text-white rounded-sm flex justify-center items-center"><AiFillAppstore /></button>
                
            </div>
            </div>
            <div className="flex  px-4 w-full h-20 bg-white mt-4">
                <div className="flex w-1/3 items-center justify-center py-2 border-r">
                    <Cards amount={data?.total_not_assigned}
                        color={"blue"}
                        title={"Not Started"}
                        text={"tasked assigned"}
                    />
                </div>
                <div className="flex w-1/3 items-center justify-center py-2 border-r">
                    <Cards amount={data?.total_in_progress}
                        color={"purple"}
                        title={"In progress"}
                        text={"tasked assigned"}
                    />  
                </div>
              
           
                <div className="flex w-1/3 items-center justify-center py-2 border-r">
                    <Cards amount={data?.total_completed}
                    color={"green"}
                        title={"Complete"}
                        text={"tasked assigned"}
                    />
                    
                </div>
               
            </div>
            <div className="mt-4">
            <TeamMemberTaskTable tasks={taskList} openForm={openReflectionForm}  getTasks={getTasks}/>
            <div className="bg-white h-12 text-sm px-4 flex items-center justify-between">
                <p className="text-gray-300">showing 1 to 1 of 1 entries</p>
                <div className="flex items-center gap-1">
                    <RxDoubleArrowLeft/>
                    <button className="py-1 px-2 bg-blue-400 rounded-sm">1</button>
                    <RxDoubleArrowRight/>
                </div>
            </div>
            </div>
           { openReflection && <div className="flex justify-center absolute border-black overflow-scroll h-auto w-full px-4  z-10   top-0">
                { <ReflectionFormTeam 
                openForm={openReflectionForm} 
                task_id={taskId}
                onSubmit={updateTaskProgress} 
               
                />}
                </div>
                }
        </div>
    );
}

export default TeamMemberTask;
