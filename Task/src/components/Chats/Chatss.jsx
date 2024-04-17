

const Chats = () => {
  return (
    <div className="h-full relative">
<div>
<div className="flex justify-start px-4 mt-4 relative">
      <p className="max-w-48 bg-white w-auto px-2 py-2  text-black rounded-md shadow-sm ">
      Hi
      </p>
      </div>
      <div className="flex justify-end px-4 mt-4">
      <p className="max-w-48 bg-blue-300 py-2 px-2 text-white w-auto  rounded-md shadow-sm ">Hi</p>
      </div>
      <div className="flex justify-start px-4 mt-4">
      <p className="max-w-48 bg-white w-auto px-2 py-2  text-black rounded-md shadow-sm ">
      This is my first chat
      </p>
      </div>
      <div className="flex justify-end px-4 mt-4">
      <p className="max-w-48 bg-blue-300 py-2 px-2 text-white w-auto  rounded-md shadow-sm ">Yeah. What's up?</p>
      </div>
     
</div>
 <div className="w-full absolute bottom-[-400] mt-10 px-4">
        <input type="text" placeholder="type your message" className="px-2 rounded-full w-4/5 py-2"/>
        <button className="bg-blue-300 text-white px-2 py-2">send</button>
      </div>
    </div>
  );
}

export default Chats;
