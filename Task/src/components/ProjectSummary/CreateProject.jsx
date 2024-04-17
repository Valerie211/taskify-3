import { useEffect, useState } from 'react';
import { MdClose } from "react-icons/md";
import { createProjectApi, getProjectApi } from '../../utils/projects';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode"
import { getAllUsersApi } from '../../utils/auth';

const CreateProject = ({ closeModal, handleClick,getProjectApi }) => {
  const [loading, setLoading] = useState(false)
  const [usersData, setUsersData] = useState([])
  const user = jwtDecode(JSON.parse(localStorage.getItem("token")))?.user_id
  console.log("userLOGIN", user)
  const [payload, setPayload] = useState({
    title: "",
    description: "",
    due_date: "",
    shared_with: [],
    creator: ""
  })
  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    if (type === "select-multiple") {
      // For multi-select, collect selected options' values
      const selectedOptions = Array.from(e.target.options)
        .filter((option) => option.selected)
        .map((option) => parseInt(option.value));
  
      // Update payload with merged selected options
      setPayload((prev) => ({ ...prev, [name]: selectedOptions }));
    } else {
      // For other input types, update value directly
      setPayload((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const getUsers = async () => {
    setLoading(true)
    try {
      const result = await getAllUsersApi()
      if (result.status === 200) {
        console.log("res", result)

        setUsersData(result?.data.user_list)

        setLoading(false)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getUsers()
  }, [])
  const submitHandler = async (e) => {
    e.preventDefault()
  try {
    const data = {
      title: payload.title,
      description: payload.description,
      due_date: payload.due_date,
      shared_with: [...payload.shared_with],
      creator: user
    }
    console.log("data", data)
    const result = await createProjectApi(data)
    if (result.status === 201) {
      console.log(result, "successfully created project");
      handleClick()
      getProjectApi()
      toast.success("project successfully created")
    }
  } catch (error) {
    toast.error(error)
  }
  }


  return (
    <div className='bg-white w-[500px] pb-4'>
      <div className='flex items-center justify-between px-3 py-3'>
        <h2 className='text-sm'>Add Project</h2>
        <MdClose />
      </div>
      <form className='px-4 ' onSubmit={submitHandler}>
        <div className='flex gap-4'>
          <div className='w-full'>
            <label htmlFor='title' className='text-xs'>Title</label>
            <input
              id="title"
              name="title"
              value={payload.value}
              onChange={handleChange}
              className='w-full border py-2 px-2 rounded-sm' />
          </div>

        </div>
        <div className='flex items-center gap-4'>
          <div className='w-1/2'>
            <label htmlFor='title' className='text-xs'>Due Date<span className='text-red-500'>*</span></label>
            <input type='date'
              id="due_date"
              value={payload.due_date}
              name='due_date'
              onChange={handleChange}
              className='w-full border py-2 px-2 rounded-sm' />
          </div>
          <div className='w-1/2 flex flex-col '>
            <label htmlFor='title' className='text-xs'>Assigned to <span className='text-red-400'>*</span></label>
            <select
              multiple
              onChange={handleChange}
              name='shared_with'
              value={payload.shared_with}
              className='px-2 py-2'>
              {usersData.length > 0 &&
                usersData.map((user, i) => {
                  return (<option key={i} value={user.id}>
                    {`${user.first_name} ${user.last_name} `}
                  </option>)
                }
                )}
            </select>
          </div>
        </div>


        <div className="flex flex-col">
          <label>Description</label>
          <textarea onChange={handleChange} name="description" value={payload.description} className='border '>

          </textarea>
        </div>
        <div className='flex justify-end gap-4 mr-4'>
          <button className='bg-red-100  text-red-400 mt-4 rounded-sm py-2  px-2' onClick={handleClick}>Close</button>
          <button type="submit" className='bg-blue-400 mt-4 rounded-sm py-2 text-white px-2'>save data</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
