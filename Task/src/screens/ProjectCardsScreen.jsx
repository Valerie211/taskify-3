import { useState, useEffect } from "react";
import ProjectCards from "../components/ProjectSummary/ProjectCards";
import { CiUser } from "react-icons/ci"
import { HiOutlineChartPie } from "react-icons/hi";
import { LuShieldClose } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi2";
import ProjectSumCards from "../components/ProjectSummary/ProjectSumCards";
import { getProjectApi, removeTProjectApi } from "../utils/projects";
import { formattedDate } from "../utils/formatDate";
import { AiFillAppstore } from "react-icons/ai";
import CreateProject from "../components/ProjectSummary/CreateProject";
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify";

const ProjectCardsScreen = () => {
    const user = jwtDecode(JSON.parse(localStorage.getItem("token")))
    const [data, setData] = useState(null)
    const [filteredData, setFilteredData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

  
    const getProject = async () => {
        setLoading(true)
        const project = await getProjectApi()
        console.log(project)
        if (project.status === 200) {
            setData(project)
            const filteredProject = project?.data.all_project.filter((user_project, i) => user_project.creator === user.user_id)
            setFilteredData(filteredProject)
            setLoading(false)
        } else {
            toast.error("Error Occurred")
        }
    }
    console.log("========>", data)
    const handleClick = () => {
        setOpen(!open)
    }
    const handleDelete = async (id,userId) => {
        try {
            const result = await removeTProjectApi(id,userId);
            console.log("user-id",result)
            if (result.status === 200) {
                getProject()
                const updatedProject = data.filter((task, i) => task.id !== id)
                setData(updatedProject)
                
                toast.success("project deleted successfully")
            }
        } catch (error) {

            toast.error(error)
        }
    }
    useEffect(() => {
        getProject()
    }, [])
    return (
        <div className='p-4'>
            <div className="flex  ml-14 gap-4">
                <ProjectCards
                    icon={<CiUser className="w-12 h-12" style={{ color: "green" }} />}
                    color={"light-green"}
                    number={data?.data?.total_completed || "0"}
                    total={"Total completed"} />
                <ProjectCards
                    icon={<HiOutlineChartPie className="w-12 h-12" style={{ color: "blue" }} />}
                    color={"light-green"}
                    number={data?.data?.total_in_progress}
                    total={"Total incomplete"} />
                {/* <ProjectCards
                    icon={<LuShieldClose className="w-12 h-12" style={{ color: "purple" }} />}
                    color={"light-green"}
                    number={data?.total_testing || "0"}
                    total={"Total Being Tested"} />
                <ProjectCards
                    icon={<HiOutlineUserGroup className="w-12 h-12" style={{ color: "orange" }} />}
                    color={"light-green"}
                    number={data?.total_pending || "0"}
                    total={"Total Not Started"} /> */}
            </div>

            <div className="flex items-center mt-4 justify-between">
                <h3 className="text-lg font-bold mt-4 px-4 ml-10">Project Summary</h3>
                <div className="flex ml-auto gap-2  px-2 mr-14">
                    {/* <button className="bg-black w-12 h-10 text-white rounded-sm flex justify-center items-center"><AiFillAppstore /></button> */}
                    <button className="bg-[#50C4ED] rounded-sm text-sm px-2 py-2 text-white" onClick={handleClick}>+ Add Project</button>
                </div>
            </div>
            <div className="flex justify-evenly flex-wrap   w-full gap-4 mt-4">
                {
                    filteredData?.map((item, i) => {
                        return <ProjectSumCards
                            title={item.title}
                            key={i}
                            id={item.id}
                            created_at={formattedDate(item.created_at)}
                            description={item.description}
                            due_date={item.due_date}
                            progress={item.progress_status}
                            handleDelete={() => handleDelete(item.id,user?.user_id)}
                            getProject={getProject}
                        />
                    })
                }
                {
                    loading && <h3 className="justify-center items-center">Loading...</h3>
                }
            </div>
            {
                open && <div className="w-full bg-opacity-30 overflow-x-hidden mt-10 flex justify-center absolute overflow-scroll   px-4  z-10 flex-end  top-0"><CreateProject handleClick={handleClick} getProjectApi={getProject} /></div>
            }
        </div>
    );
}

export default ProjectCardsScreen;
