import React, { useState, useEffect } from 'react';
import Reflection from '../components/Reflections/Reflection';
import EditReflectionForm from '../components/Reflections/EditReflection';
import { IoMdSearch } from "react-icons/io";
import { getReflectionApi, removeReflectionApi } from '../utils/reflection';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const ReflectionScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReflection, setSelectedReflection] = useState(null);
  const {id} = useParams()
  // const date = new Date();
  // const options = { timeZone: 'Europe/London' };
  // const reflection_data = {
  //   created_at: date.toLocaleString('en-GB', options),
  //   title: "My First Reflection",
  //   content: "I am so excited to start this journey of self-reflection."
  // };

  const getReflections = async () => {
    setLoading(true);
    try {
      const result = await getReflectionApi(id);
      console.log(result);
      if (result.status === 200) {
        setData(result?.data?.reflects);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getReflections();
  }, []);

  const handleDelete =async(id)=>{
    const confirmed = window.confirm("are you sure you want to delete")
    if(!confirmed){return}
    try {
      const result =  await removeReflectionApi(id);
      if (result.status===204) {
        toast.success("successfully deleted")
        const updatedData= data.filter((item,i)=>item.id !== id)
        setData(updatedData)
      }
    } catch (error) {
      toast.error("error occurred")
    }
    
}
  const handleModal = (tas) => {
    setSelectedReflection(tas);
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative w-full'>
      <div>
        <h2 className='px-4 text-center text-lg font-bold mt-4'>Reflections</h2>
        <div className='bg-[#fcfcfc] w-96 justify-between  flex   rounded-full mt-4 shadow-sm mx-auto'>
          <input type='search' placeholder='search by project' className='py-2 text-center rounded-full   px-2 outline-none ' />

          <button className='text-black flex justify-center  rounded-sm px-3 py-2 '><IoMdSearch size={24} /></button>
        </div>
        {
        data?.length === 0 || !data && <p className='text-black'>No data available</p>
      }
        <div className='mt-5 px-4 flex flex-wrap justify-evenly gap-4'>
          {data?.length > 0 && data?.map((tas, i) => (
            <Reflection key={tas.id} created_at={tas.mood}  handleDelete={()=>handleDelete(tas.id)} tasks={tas.whatContributedMost} openForm={() => handleModal(tas)} />
          ))}
          { loading && (<p>loading...</p>)}
        </div>
      </div>
      {isOpen && (
        <div className='flex bg-opacity-30 bg-black backdrop-blur-sm justify-center absolute border-black overflow-scroll h-auto w-full px-4  z-10 flex-end  top-0'>
          <EditReflectionForm openForm={() => setIsOpen(!isOpen)} reflectionData={selectedReflection} />
        </div>
      )}
    
    </div>
  );
}

export default ReflectionScreen;
