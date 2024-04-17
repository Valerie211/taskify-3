import { useNavigate } from 'react-router-dom';
import logo from '../../assets/taskify-logo.png'
import taskify from "../../assets/taskify-team.png"

const Home = () => {
  const nav = useNavigate()
  return (
    <div className='min-h-screen w-full bg-[#F3F3F3]'>
      <div className='px-[100px] flex items-center  justify-between w-full  py-5 '>
       <div>
       <img src={logo} alt="log"/>
       </div>
        <div className="flex items-center gap-4">
            <button onClick={()=>nav("/register")} className="bg-[#A748F6] text-[16px] font-bold py-2 w-[100px] rounded-full px-2 text-white">Register</button>
            <button onClick={()=>nav("/login")} className=" text-[16px] font-bold py-2 w-[100px] rounded-full px-2 text-purple-900 border border-purple-900">Login</button>
            </div>
      </div>
      <div className='flex  h-[450px] mt-0'>
        <div className='w-1/2'>
        <div className="h-full  flex flex-col px-20 justify-center">
           <h3 className="text-black text-[32px] font-bold">"Stay on track,"</h3>
            <p className="text-[#A748F6]  text-[50px] ">every task at a time</p>
            <p className="text-black text-[16px]">Let's make progress,one task at a time.Every completed task is a step to achieving our goals...</p>
            <div className="flex justify-start gap-4 w-full mt-4">
            <button onClick={()=>nav("/register")} className="bg-[#A748F6] text-[16px] font-bold py-2 w-[100px] rounded-full px-2 text-white">Register</button>
            {/* <button onClick={()=>nav("/login")} className=" text-[16px] font-bold py-2 w-[100px] rounded-full px-2 text-purple-900 border border-purple-900">Login</button> */}
            </div>
        </div>
        </div>
        <div className='w-1/2  '>
          <img src={taskify} alt='Taskify App Screenshot' className='h-full  w-full' />
        </div>
      </div>
    </div>
  );
}

export default Home;
