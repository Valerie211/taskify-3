import { RiCalendarCheckLine } from "react-icons/ri"

const DashboardLineCard = ({title}) => {
  return (
    <div className="w-1/4 flex flex-col gap-4 h-28 py-4 px-2 bg-white shadow-sm">
        <div className='flex justify-between items-center'>
            <div>
                <h2 className="text-sm font-medium">{title}</h2>
                <h2 className="font-bold text-lg">4</h2>
            </div>
            <button className='bg-blue-200 py-2 px-2 rounded-sm'>
                <RiCalendarCheckLine className='text-blue-400'/>
            </button>
        </div>
     <div >
     <div className="flex justify-between text-sm">
            <h2>Tasks Finished</h2>
            <h3>0/100</h3>
        </div>
       <div className="w-full h-1 bg-gray-200 rounded-full relative">
          <div className="h-full bg-gray-200 rounded-full absolute top-0" style={{ width: "50%" }}></div>
        </div>
     </div>
    </div>
  );
}

export default DashboardLineCard;
