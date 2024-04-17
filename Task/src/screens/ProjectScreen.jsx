import { useEffect, useState } from "react";
import ProjectSummaryCards from "../components/ProjectSummary/ProjectSummaryCards";
import { AiFillAppstore } from "react-icons/ai";
import { getProjectApi } from "../utils/projects";
import { formattedDate } from "../utils/formatDate";
import { jwtDecode } from "jwt-decode"

const ProjectScreen = () => {
    const user = jwtDecode(JSON.parse(localStorage.getItem("token")))
    console.log("userloggrgin",user)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [open,setOpen] =useState(false)
    const getProject = async () => {
        setLoading(true)
        const project = await getProjectApi()
        console.log("project",project)
        if (project.status === 200) {
            const filteredProject = project?.data.all_project.filter((user_project,i)=>user_project.creator===user.user_id)
            console.log("filtereddATA---->",filteredProject)
             setData(filteredProject)
            setLoading(false)
        } else {
            alert("Error Occurred")
        }
    }
    const handleClick = ()=>{
        setOpen(!open)
    }
    useEffect(() => {
        getProject()
    }, [])
   
    return (
        <div className="p-4 relative">
            <div className="flex justify-between">
                <h2>Project Summary</h2>
                
            </div>
            <div className="flex flex-wrap justify-evenly w-full gap-2 mt-4">
                {
                    data?.map((item, i) => {
                        return <ProjectSummaryCards
                            title={item.title}
                            key={i}
                            id={item.id}
                            created_at={formattedDate(item.created_at)}
                            description={item.description}
                            due_date={item.due_date}
                            progress={item.progress_status}
                        />
                    })
                }
                {
                    loading && <h3 className="justify-center items-center">Loading...</h3>
                }
                
            </div>
           
        </div>
    );
}

export default ProjectScreen;
