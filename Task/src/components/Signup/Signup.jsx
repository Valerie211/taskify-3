import  {useState} from "react" 
import { useNavigate } from "react-router-dom"
import { RegisterApi } from "../../utils/auth"
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const SignUp = () => {
    const nav = useNavigate()
    const [loading,setLoading] =useState(false)
    const [payload,setPayload] = useState({
        username:"",
        password:"",
        first_name:"",
        last_name:"",
        email:"",
        phone:"",
        country:"",
        is_superuser:false
    })
    const handleChange = (e)=>{

        const { name, value} = e.target
       console.log("value",value)
    //    const newValue = name === "is_superuser" ? value === "true" : value;
        setPayload(prev=>({...prev,[name]: value}))
    }
    const submitHandler =async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            console.log("payload-submitted",payload)
            const data ={
                ...payload,
                is_superuser: payload.is_superuser  === "true" ? true :false
            }
            const result = await RegisterApi(data)
            console.log("submitted",result.data)
             if(result?.status === 201){

                 toast.success(result?.data?.message)
                 setLoading(false)
                 nav("/login")
                }
        } catch (error) {
            console.log(error.message);
            toast.error("invalid input")
            setLoading(false)
        }
    }
    return (
        <div className='border-2 bg-white shadow-md rounded-md px-4 py-4'>
            <h2 className="text-lg text-center text-[#A748F6] font-bold">SigUp Form</h2>
            <form className="mt-4 md:w-[500px]" onSubmit={submitHandler}>
                <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-1 w-1/2">
                    <label htmlFor="" className="flex flex-col text-sm">firstName <span className="text-red-500">*</span></label>
                    <input placeholder="firstName" type="text"
                     id="first_name"
                     name="first_name"
                     value={payload.first_name}
                    //  required
                     onChange={handleChange}
                     className="border-2 py-2 px-2 rounded-sm" />
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                    <label htmlFor="" className="flex flex-col text-sm">lastName <span className="text-red-500">*</span></label>
                    <input placeholder="lastName" type="text"
                     id="last_name"
                     name="last_name"
                     value={payload.last_name}
                    //  required
                     onChange={handleChange}
                     className="border-2 py-2 px-2  rounded-sm" />
                </div>
                </div>
                <div className="flex gap-4 w-full">
                <div className="flex flex-col w-1/2 gap-1 text-sm">
                    <label htmlFor="" className="flex flex-col">Phone <span className="text-red-500">*</span></label>
                    <input placeholder="phone" type="text"
                     id="phone"
                     name="phone"
                     value={payload.phone}
                    //  required
                     onChange={handleChange}
                     className="border-2 py-2 px-2 rounded-sm " />
                </div>
                <div className="flex flex-col gap-1 text-sm w-1/2">
                    <label htmlFor="" className="flex flex-col">Country <span className="text-red-500">*</span></label>
                    <input placeholder="country" type="text"
                     id="country"
                     name="country"
                     value={payload.country}
                    //  required
                     onChange={handleChange}
                     className="border-2 w-full py-2 px-2 rounded-sm" />
                </div>
             
                </div>
                <div className="flex gap-4 w-full">
                <div className="flex flex-col w-1/2 gap-1 text-sm">
                    <label htmlFor="" className="flex flex-col">Username <span className="text-red-500">*</span></label>
                    <input placeholder="username" type="text"
                     id="username"
                     name="username"
                     value={payload.username}
                    //  required
                     onChange={handleChange}
                     className="border-2 py-2 px-2 rounded-sm " />
                </div>
                <div className="flex flex-col gap-1 text-sm w-1/2">
                    <label htmlFor="" className="flex flex-col">Email <span className="text-red-500">*</span></label>
                    <input placeholder="email" type="text"
                     id="email"
                     name="email"
                     value={payload.email}
                    //  required
                     onChange={handleChange}
                     className="border-2 w-full py-2 px-2 rounded-sm" />
                </div>
             
                </div>
              <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-1 text-sm w-1/2">
                    <label htmlFor="" className="flex flex-col">Password <span className="text-red-500">*</span></label>
                    <input placeholder="password" 
                    type="password" 
                    name="password" 
                    onChange={handleChange}
                    id="password"  
                    value={payload.password}
                    // required 
                    className="border-2  py-2 px-2 rounded-sm text-sm" />
                </div>
                <div className="flex flex-col gap-1 text-sm w-1/2">
                    <label htmlFor="" className="flex flex-col">Role <span className="text-red-500">*</span></label>
                  <select value={payload.is_superuser} onChange={(e)=>setPayload({...payload,is_superuser:e.target.value})} className="px-2 py-2 border ">
                    <option value={true}>Project Manager</option>
                    <option value={false}>Team Member</option>
                  </select>
                </div>
              </div>
                <div className="mt-4 mb-4">
                    <div className="flex items-center ">
                    <p className="text-sm">Already have an account ? <Link to="/login" className="text-[#A748F6]">Login</Link></p>
                    </div>
                    <button type="submit"  className="text-center text-white mt-2 rounded-sm px-2 py-2 bg-[#A748F6] w-full">{loading ? "submitting...":"register"}</button>
                </div>
            </form>
            
        </div>
    );
}

export default SignUp;
