
import { FaCheck } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { LiaTrashSolid } from "react-icons/lia";

const Latest = () => {
    return (
        <div className='border-b py-2 text-gray-300'>
            <div className="px-4">
                <h2 className="text-sm flex items-center text-green-300 gap-3" ><FaCheck /> <span>in progress</span></h2>
            </div>
            <div className="px-4 flex justify-between mt-2">
                <p className="text-sm pl-6">work2</p>
                <div className="flex gap-3">
                    <button className="text-red-300"><LiaTrashSolid /></button>
                    <button className="text-blue-300" ><BiEditAlt /></button>
                </div>
            </div>
            <div className="px-4 flex justify-between mt-2">
                <p className="text-sm">Feb,20,2024 4:15pm</p>
            </div>
        </div>
    );
}

export default Latest;
