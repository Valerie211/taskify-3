import { useNavigate } from "react-router-dom";
import user from "../../assets/user.png"

const ProjectSummaryCards = ({ title,created_at,due_date,description,progress,id }) => {
  const nav = useNavigate()

  return (
    <div className="w-1/4 h-[400px] mt-4 p-4 bg-white rounded-sm cursor-pointer" onClick={() => nav(`/team-member/task/${id}`)}>
      <h2 className="text-sm font-bold mb-4 text-gray-500">{title}</h2>
      <hr />
      <div className="mt-4 mb-4 flex items-center">
        <img className="w-5 h-5"src={user} />
        <p className="ml-3 text-sm">{created_at}</p>
      </div>
      <h3 className="mb-4 text-sm">{description}</h3>
      <h3 className="mb-4 text-sm font-bold">Team</h3>
      <img className="w-5 h-5" src={user} />
      <div className="mt-4 border border-b">
        <div className="w-full h-1 bg-gray-200 rounded-full relative">
          <div className="h-full bg-purple-500 rounded-full absolute top-0" style={{ width: "50%" }}></div>
        </div>

      </div>
      <div>
        <h3 className="text-sm text-gray-400 mt-4 mb-4">Due: <span className="text-purple-500">{due_date}</span></h3>
        <h3 className="text-sm text-gray-400">status: <span className="text-purple-500">{progress}</span></h3>
      </div>
    </div>
  );
}

export default ProjectSummaryCards;
