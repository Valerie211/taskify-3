import icon from '../../assets/user.png'

const Notification = () => {
  return (
    <div className='w-32 h-56 rounded-sm shadow-sm bg-[#fcfcfc] overflow-x-hidden overflow-y-auto'>
      <div className='flex  mx-auto gap-2 px-2 py-2 mb-2'>
        <img src={icon} width={20} height={20} className='rounded-full'/>
        <div className='flex justify-center flex-col'>
        <h4 className='text-xs whitespace-nowrap'>This is my first note</h4>
        <h5 className='text-xs whitespace-nowrap'>29 March 2024 12:00</h5>
        </div>
      </div>
      <div className='flex  mx-auto gap-2 px-2 py-2 mb-2'>
        <img src={icon} width={20} height={20} className='rounded-full'/>
        <div className='flex justify-center flex-col'>
        <h4 className='text-xs whitespace-nowrap'>This is my first note</h4>
        <h5 className='text-xs whitespace-nowrap'>29 March 2024 12:00</h5>
        </div>
      </div>
      <div className='flex  mx-auto gap-2 px-2 py-2 mb-2'>
        <img src={icon} width={20} height={20} className='rounded-full'/>
        <div className='flex justify-center flex-col'>
        <h4 className='text-xs whitespace-nowrap'>This is my first note</h4>
        <h5 className='text-xs whitespace-nowrap'>29 March 2024 12:00</h5>
        </div>
      </div>
      <div className='flex  mx-auto gap-2 px-2 py-2 mb-2'>
        <img src={icon} width={20} height={20} className='rounded-full'/>
        <div className='flex justify-center flex-col'>
        <h4 className='text-xs whitespace-nowrap'>This is my first note</h4>
        <h5 className='text-xs whitespace-nowrap'>29 March 2024 12:00</h5>
        </div>
      </div>
    </div>
  );
}

export default Notification;
