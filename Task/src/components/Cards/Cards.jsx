

const Cards = ({amount,title,text,color}) => {
  return (
    <div className='flex flex-col '>
      <div className='flex items-center gap-2'>
            <p style={{color:`${color}`}} className="text-md  text-gray-600 font-bold">{amount}</p>
            <h3 className="text-gray-600 font-bold text-sm">{title}</h3>
      </div>
      <h3 className="text-gray-400">{text}</h3>
    </div>
  );
}

export default Cards;
