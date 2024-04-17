import { useState,useEffect } from "react";
import Cards from "../Cards/Cards";
import TaskTable from "./TaskTable";
import { RxDoubleArrowRight } from "react-icons/rx";
import { RxDoubleArrowLeft } from "react-icons/rx";
import AddNewTaskForm from "./AddNewTaskForm";
import { AiFillAppstore } from "react-icons/ai";
import ReflectionForm from "../Reflections/ReflectionForm";
import {getTaskApiById} from "../../utils/tasks"
import {toast} from "react-toastify"
import {useParams} from  "react-router-dom"
import { CSVLink } from "react-csv";
import EditTaskForm from "./EditTask";


const Task = () => {
    const [open,setOpen] =useState(false)
    const [edit,setEdit] =useState(false)
    const [openReflection,setOpenReflection] = useState(false)
    const [data,setData] = useState(null)
    const [taskList,setTaskList] = useState([])
    const [loading,setLoading] = useState(false)
    const {project_id} = useParams()
    const [task_id,setTaskId] =useState(null) 
    const [editTask,setEditTask] =useState(null)
    console.log("id",project_id)

    const openReflectionForm =(task_id)=>{
        setTaskId(task_id)
        setOpenReflection(!openReflection)
    }
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
    console.log("data",data)
    useEffect(()=>{
        getTasks()
    },[])
    const  handleClick=()=>{
        
        setOpen(!open)
      };
      const toggleEdit=()=>{
        setEdit(!edit)
      }
      const handleEdit =(task)=>{
        setEditTask(task)
        toggleEdit()
      }
    return (
        <div className="px-4 relative">
            <div className="flex justify-between mt-4 relative">
            <h2 className="mt-4">Task Summary</h2>
            <div className="flex ml-auto gap-2 ">

                <button className="bg-[#50C4ED] rounded-sm text-sm px-2 text-white" onClick={handleClick}>+ Add Task</button>
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
                {/* <div className="flex w-1/6 items-center justify-center py-2 border-r">
                    <Cards amount="0"
                        color={"orange"}
                        title={"Testing"}
                        text={"tasked assigned"}
                    />
                    
                </div> */}
                {/* <div className="flex w-1/6 items-center justify-center py-2 border-r">
                    <Cards amount="0"
                        color={"red"}
                        title={"Awaiting"}
                        text={"tasked assigned"}
                    />
                    
                </div> */}
                <div className="flex w-1/3 items-center justify-center py-2 border-r">
                    <Cards amount={data?.total_completed}
                    color={"green"}
                        title={"Complete"}
                        text={"tasked assigned"}
                    />
                    
                </div>
                {/* <div className="flex w-1/6 items-center justify-center py-2 ">
                    <Cards amount="0"
                        color={"red"}
                        title={"pending"}
                        text={"tasked assigned"}
                    />
                </div> */}
            </div>
            <div className="mt-4">
            <TaskTable handleEdit={handleEdit}  openForm={openReflectionForm} tasks={taskList} setTasks={setTaskList}/>
            <div className="bg-white h-12 text-sm px-4  relative flex items-center justify-between">
                <p className="text-gray-300">showing 1 to 1 of 1 entries</p>
                <div className="flex items-center gap-1">
                    <RxDoubleArrowLeft/>
                    <button className="py-1 px-2 bg-blue-400 rounded-sm">1</button>
                    <RxDoubleArrowRight/>
                </div>
            </div>
            </div>
            {open && <div className="absolute w-4/5  flex h-auto justify-between   z-10   top-0">
               <div className="bg-opacity-30 border-2 w-1/2 bg-black backdrop-blur-sm ">

                </div>
                 <div className="w-1/2">
                    <AddNewTaskForm closeModal={handleClick} getTasks={getTasks}/>
                </div> 
                 
            </div>}
            {
                edit && <div className="absolute w-4/5  flex h-auto justify-between   z-10   top-0">
               <div className="bg-opacity-30 border-2 w-1/2 bg-black backdrop-blur-sm ">

                </div>
                 <div className="w-1/2">
                    <EditTaskForm 
                    handleClick={toggleEdit}
                    task={editTask}
                     getTasks={getTasks}/>
                </div> 
                 
            </div> 
            }
            {
                openReflection &&
                 <div className="flex justify-center absolute border-black overflow-scroll h-auto w-full px-4  z-10   top-0">
                { <ReflectionForm openForm={openReflectionForm} task_id={task_id} />}
                </div>
            }
        </div>
    );
}

export default Task;
