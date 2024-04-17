
import { useEffect,useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { getReflectionApi, removeReflectionApi } from "../../utils/reflection";
import { toast } from "react-toastify";


const Reflection = ({tasks,created_at,openForm,handleDelete}) => {
  const [data,setData] = useState()
  const [loading,setLoading] = useState(false)
    const handleClick = ()=>{
      openForm()
    }
    const getReflections =async()=>{
      setLoading(true)
      try {
        const result = await getReflectionApi()
        console.log(result)
        if(result){
          setData(result)
          console.log("result=====>", result)
          setLoading(false)
        }
      } catch (error) {
        toast.error(error)
      }
    }
   

    useEffect(()=>{
      getReflections()
    },[])
    
  return (
    <div className='bg-[#fcfcfc] px-2 py-2 flex flex-col items-center  justify-center rounded-md w-48 shadow-sm'>
      <h2 className='text-sm font-bold'>{tasks}</h2>
      <p className='text-sm'>{created_at}</p>
     <div className='flex justify-center gap-2 mt-2'>
     <button className='bg-blue-500 text-white rounded-sm px-2 py-1 text-xs' onClick={handleClick}>View more</button>
     <button className='bg-red-500 text-white rounded-sm px-2 py-1 text-xs' onClick={handleDelete}><MdOutlineDelete /></button>
     </div>
    </div>
  );
}

export default Reflection;
