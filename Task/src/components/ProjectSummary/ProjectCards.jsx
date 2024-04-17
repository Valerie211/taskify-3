


const ProjectCards = ({icon, number, total, color}) => {
  return (
    <div className='bg-white w-1/4 flex items-center p-2 gap-4 h-24 rounded-sm'>
      <div className="w-12 h-12 rounded-2xl" style={{backgroundColor:`${color}`}}>
        <button  className="">{icon}</button>
      </div>
      <div>
        <h4 className="text-2xl font-bold" style={{color:`${color}`}}>{number}</h4>
        <h4 className="text-sm font-bold ">{total}</h4>
      </div>
    </div>
  );
}

export default ProjectCards;
