import { useEffect, useState } from 'react';
import Reflection from '../components/Reflections/Reflection';
import EditReflectionForm from '../components/Reflections/EditReflection';
import { IoMdSearch } from "react-icons/io";
import { toast } from 'react-toastify';
import { getReflectionApi } from '../utils/reflection';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"

const ReflectionForManagerScreen = () => {
  const user = jwtDecode(JSON.parse(localStorage.getItem("token")))
  // const [userReflection,setUserReflection] = useState(null)
  const {id} = useParams()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedReflection, setSelectedReflection] = useState(null);


  const getReflections = async () => {
    setLoading(true)
    try {
      console.log("it's working",id)
      const result = await getReflectionApi(id)
      console.log("result---->",result)
      if (result.status === 200) {
        
        setData(result?.data?.reflects)
        setLoading(false)
      }
      console.log("it should work")
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    getReflections(id)
  }, [id])
 
  const handleModal = (tas) => {
    setSelectedReflection(tas);
    setIsOpen(!isOpen);
  };
  console.log("data======>234567890", data)
  return (
    <div className='relative w-full'>
      <div>
        <h2 className='px-4 text-center text-lg font-bold mt-4'>Reflections</h2>
        <div className='bg-[#fcfcfc] w-96 justify-between  flex   rounded-full mt-4 shadow-sm mx-auto'>
          <input type='search' placeholder='search by project' className='py-2 text-center rounded-full  w-4/5    px-2 outline-none ' />

          <button className='text-black flex justify-center  rounded-sm px-3 py-2 '><IoMdSearch size={24} /></button>
        </div>
        <div className='mt-5 px-4 flex flex-wrap justify-evenly gap-4'>
          {data?.length > 0 && 
          data?.map((reflect,i)=>{
          return <Reflection key={reflect.id} created_at={reflect?.created_at} tasks={reflect?.mood} openForm={()=>handleModal(reflect)} />})}
          {
            loading && <p>Loading...</p>
          }
          {
            data?.length === 0 && <p>No reflection data available</p>
          }
        </div>
      </div>
      {
        isOpen && <div className='flex bg-opacity-30 bg-black backdrop-blur-sm justify-center absolute border-black overflow-scroll h-auto w-full px-4  z-10 flex-end  top-0'>
          <EditReflectionForm openForm={handleModal} reflectionData={selectedReflection} />
        </div>
      }
    </div>
  );
}

export default ReflectionForManagerScreen;
