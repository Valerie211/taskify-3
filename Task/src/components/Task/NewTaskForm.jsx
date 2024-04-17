import React,{useState} from 'react';
import {toast} from "react-toastify"
import { jwtDecode} from "jwt-decode"
import { createTaskApi } from '../../utils/tasks';
import { useParams } from 'react-router-dom';

const NewTaskForm = ({closeModal,getTasks}) => {
    const {project_id} = useParams()
    const [open,setOpen]=useState(false)
    const user =  jwtDecode(JSON.parse(localStorage.getItem("token")))?.user_id
    const [payload,setPayload] = useState({
        title: "",
        due_date: "",
        creator: 0,
       project: 0,
       start_date:"",
       end_date:"",
       pri_status:"",
       due_time:"",
       progress_status:"",
       description:""
    })
    const handleChange = (e)=>{

        const { name, value,type} = e.target
        console.log("name",value)

            setPayload((prev) => ({ ...prev, [name]: value }));
          
    }
    const submitHandler = async(e)=>{
        e.preventDefault()
        const data ={
            title:payload.title,
            description: payload.description,
            due_date: payload.due_date,
            creator:user,
            project:parseInt(project_id),
           start_date:payload.start_date,
        //   end_date: payload.end_date,
          pri_status: payload.pri_status,
          due_time: payload.due_time,
         progress_status: payload.progress_status,
         
        }
        console.log("data",data)
        const result = await createTaskApi(data,project_id)
        if(result.status === 201){
            console.log(result,"successfully created project");
            toast.success("task successfully created")
            setPayload({
              title: "",
              creator: 0,
               project: 0,
               start_date:"",
               due_date:"",
               pri_status:"",
               due_time:"",
               progress_status:"",
               description:""
            })
        }
        closeModal()
        getTasks()
    }
  return (
    <div className='bg-white w-full'>
      <form className='px-4' onSubmit={submitHandler}>
        <div className='flex gap-4'>
            <div className='w-1/2'>
                <label htmlFor='title' className='text-xs'>Title</label>
                <input
                name="title"
                onChange={handleChange}
                value={payload.title}
                 className='w-full border py-2 px-2 rounded-sm'/>
            </div>
            <div className='w-1/2'>
                <label htmlFor='Start Date' className='text-xs'>Start Date <span className='text-red-400'>*</span></label>
                <input
                name="start_date"
                 type='date' 
                 value={payload.start_date}
                onChange={handleChange}
                className='w-full border py-2 px-2 rounded-sm'/>
            </div>
        </div>
        <div className='flex gap-4'>
            <div className='w-1/2'>
                <label htmlFor='title' className='text-xs'>End Date</label>
                <input 
                type='date'
                name="due_date"
                 value={payload.due_date}
                onChange={handleChange}
                 className='w-full border py-2 px-2 rounded-sm'/>
            </div>
            <div className='w-1/2'>
                <label htmlFor='time' className='text-xs'>Estimated Hour <span className='text-red-400'>*</span></label>
                <input 
                type='text'
                name="due_time" 
                 value={payload.due_time}
                onChange={handleChange}
                 placeholder='09:30' className='w-full border py-2 px-2 rounded-sm'/>
            </div>
        </div>
        <div className='flex gap-4'>
            <div className='w-1/2'>
                <label htmlFor='' className='text-xs'>Status</label>
                <select
              name='progress_status'
              value={payload.progress_status}
              onChange={handleChange}
              className='w-full border py-2 px-2 rounded-sm'
            >
              <option value=''>Select Status</option>
              <option value='not_assigned'>Not Started</option>
              <option value='progress'>In Progress</option>
              <option value='completed'>Completed</option>
            </select>
            </div>
            <div className='w-1/2'>
                <label htmlFor='' className='text-xs'>Priority <span className='text-red-400'>*</span></label>
                <select
              name='pri_status'
              value={payload.pri_status}
              onChange={handleChange}
              className='w-full border py-2 px-2 rounded-sm'
            >
              <option value=''>Select Priority</option>
              <option value='high'>High</option>
              <option value='medium'>Medium</option>
              <option value='low'>Low</option>
            </select>
            </div>
        </div>
        <div className='flex gap-4'>
            {/* <div className='w-1/2'>
                <label htmlFor='' className='text-xs'>Deadline add</label>
                <input 
                name="due_date"
                 type='date' 
                 value={payload.due_date}
                onChange={handleChange}
                className='w-full border py-2 px-2 rounded-sm'/>
            </div> */}
            <div className='w-1/2'>
                <label htmlFor='' className='text-xs'> <span className='text-red-400'>*</span></label>
               <img src='' alt=''/>
            </div>
        </div>
        <div  className=" flex flex-col">
            <label>Description</label>
            <textarea 
               name="description"
                 type='text' 
                 value={payload.description}
                onChange={handleChange}
             className='border '>

            </textarea>
        </div>
        <button type='submit' className='bg-blue-400 mt-4 rounded-sm py-2 text-white px-2'>submit data</button>
      </form>
    </div>
  );
}

export default NewTaskForm;
