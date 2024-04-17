import React from 'react';

import user from '../../assets/user.png'
const ChatLists = () => {
  return (
    <div className="flex justify-between mt-2 px-2">
       <div className='flex gap-2'>
       <div className='rounded-full'>
        <img src={user} height={40} width={40} alt='profileImg' />
        </div>
        <div>
          <p className="font-bold ">Valerie</p>
          <p>typing....</p>
        </div>
       </div>
       <div className="">
        <p className='text-gray-400'>12:00pm</p>
        <div className='flex justify-end'>
        <p className='rounded-full   h-4 w-4 bg-red-600 text-xs text-center text-white'>2</p>
        </div>
       </div>
        {/* <ChatsList/> */}
      </div>
  );
}

export default ChatLists;
