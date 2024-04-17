import NewTaskForm from "./NewTaskForm";
import { MdClose } from "react-icons/md";

const AddNewTaskForm = ({closeModal,getTasks}) => {

  return (
    <div className="w-full flex flex-col justify-between p-4 bg-white ">
      <div className="flex w-full justify-between">
      <h2 className="text-sm">Add new task</h2>
      <button onClick={closeModal} className="w-10 h-10 bg-pink-200 flex justify-center items-center"> <MdClose/></button>
      </div>
      <NewTaskForm onClick={closeModal} closeModal={closeModal} getTasks={getTasks}/>
    </div>
  );
}

export default AddNewTaskForm;
