
import user from '../../assets/user.png'
import { MdOutlineEmojiEmotions } from "react-icons/md"
import { GoPaperclip } from "react-icons/go";
import { LuSend } from "react-icons/lu";
import ChatLists from './ChatLists';

const Chats = () => {
  return (
    <div className='flex  w-full h-[600px] bg-white scroll'>
      <div className='w-2/5 border-5 border-red-500 h-full  overflow-y-auto'>
      <div className='py-2'>
      <ChatLists/>
      </div>
      <div className='py-2'>
      <ChatLists/>
      </div>
      <div className='py-2'>
      <ChatLists/>
      </div><div className='py-2'>
      <ChatLists/>
      <div className='py-2'>
      <ChatLists/>
      </div>
      <div className='py-2'>
      <ChatLists/>
      </div>
      <div className='py-2'>
      <ChatLists/>
      </div>
      <div className='py-2'>
      <ChatLists/>
      </div>
      </div>
      <ChatLists/>
      </div>
      <div className='w-3/5 relative  h-full bg-[#f6f8fc] '>
        <div className='scroll overflow-y-auto h-[calc(100% - 72px)]  py-4   w-full'>
        <h2 className='text-center mb-2 mx-auto mt-4 w-32 bg-white rounded-full'>Today,Jan 30</h2>
        <div className='flex gap-2 mb-2'>
          <div className='rounded-full'>
            <div><img src={user} height={40} width={40} alt='profileImg' /></div>
          </div>
          <p className='text-black font-bold'>Mahod Gonna</p>
          <p className='text-gray-400'>5:00pm</p>
        </div>

        <div>
          <p className='ml-10 p-2 bg-white text-black mb-2 min-w-fit w-48 rounded-full'>How are you doing</p>
          <p className='ml-10 p-2 bg-white text-black mb-2 min-w-fit w-48 rounded-full'>How are you doing</p>
        </div>
        <div className='flex justify-end gap-2 mb-2'>
          <p className='text-gray-400'>5:00pm</p>
          <p className='text-black'>You</p>
          <div className='rounded-full'>
            <div><img src={user} height={40} width={40} alt='profileImg' /></div>
          </div>

        </div>
        <div className='flex flex-col'>
          <p className='ml-auto mr-10 p-2 bg-blue-600 text-white mb-2 min-w-fit w-48 rounded-full'>How are you doing</p>
          <p className='ml-auto mr-10 p-2 bg-blue-600 text-white mb-2 min-w-fit w-48 rounded-full'>How are you doing</p>
        </div>
        <div className='flex gap-2 mb-2'>
          <div className='rounded-full'>
            <div><img src={user} height={40} width={40} alt='profileImg' /></div>
          </div>
          <p className='text-black font-bold'>Mahod Gonna</p>
          <p className='text-gray-400'>5:00pm</p>
        </div>

        <div>
          <p className='ml-10 p-2 bg-white text-black mb-2 min-w-fit w-48 rounded-full'>How are you doing</p>
          <p className='ml-10 p-2 bg-white text-black mb-2 min-w-fit w-48 rounded-full'>How are you doing</p>
        </div>
        <div className='flex justify-end gap-2 mb-2'>
          <p className='text-gray-400'>5:00pm</p>
          <p className='text-black'>You</p>
          <div className='rounded-full'>
            <div><img src={user} height={40} width={40} alt='profileImg' /></div>
          </div>

        </div>
        <div className='flex flex-col  '>
          <p className='ml-auto mr-10 p-2 bg-blue-600 text-white mb-2 min-w-fit w-48 rounded-full'>How are you doing</p>
          <p className='ml-auto mr-10 p-2 bg-blue-600 text-white mb-2 min-w-fit w-48 rounded-full'>How are you doing</p>
        </div>
        </div>
        <div className="w-full flex absolute py-1 shadow-md border-t  bottom-0 mt-10 ">
          <div className='flex gap-2 items-center'>
          <MdOutlineEmojiEmotions  size={24}/>
          <GoPaperclip  size={24}/>
          </div>
          <input type="text" placeholder="type a message" className="px-2 rounded-full w-full py-2" />
          <button className="bg-blue-300 text-white px-2 py-2"><LuSend size={24} /></button>
        </div>


      </div>
    </div>
  );
}

export default Chats;
