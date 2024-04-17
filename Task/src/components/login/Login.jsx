import  {useState} from "react" 
import { useNavigate } from "react-router-dom"
import { loginApi } from "../../utils/auth"
import {toast } from "react-toastify"

const Login = () => {
    const nav = useNavigate()
    const [payload,setPayload] = useState({
        username:"",
        password:""
    })
    const handleChange = (e)=>{

        const { name, value} = e.target
        console.log("name",name)
        console.log("value",value)

        setPayload(prev=>({...prev,[name]: value}))
    }
    const submitHandler =async(e)=>{
        e.preventDefault()
       try {
        const result = await loginApi(payload)
        console.log("token",result.data.access)
        if(result.status === 200){
            console.log("result",result)
            localStorage.setItem('token',JSON.stringify(result?.data?.access));
        toast.success("login successfully")
        nav("/dashboard")
}
  } catch (error) {
        console.log(error)
        toast.error("Invalid Credentials")
       }
    }
    return (
        <div className='border-2  shadow-xl rounded-md px-4 py-4 bg-white'>
            <h2 className="text-center text-md text-[#A748F6] font-bold">Login</h2>
            <form className="mt-4 md:w-[400px]" onSubmit={submitHandler}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="flex flex-col">Username <span className="text-red-400">*</span></label>
                    <input placeholder="" type="text"
                     id="username"
                     name="username"
                     value={payload.username}
                    //  required
                     onChange={handleChange}
                     className="border-2 py-2 px-2 rounded-sm" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="flex flex-col">Password <span className="text-red-400">*</span></label>
                    <input placeholder="" 
                    type="password" 
                    name="password" 
                    onChange={handleChange}
                    id="password"  
                    value={payload.password}
                    // required 
                    className="border-2 py-2 px-2 rounded-sm" />
                </div>
                <div className="mt-4 mb-4">
                    <div className="flex items-center gap-1">
                        <input type="checkbox" id="rememberMe" />
                        <label htmlFor="rememberMe" className="text-xs font-bold">Stay signed in</label>
                    </div>
                    <button type="submit"  className="text-center text-white mt-2 rounded-sm px-2 py-2 bg-[#A748F6] w-full">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
