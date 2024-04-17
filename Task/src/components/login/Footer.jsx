

const Footer = () => {
  return (
    <div className="flex flex-col items-center">
            <span className="text-sm text-gray">Don't have an account? <a href="/register" className="text-purple-500">Sign up</a></span>
            <div className="flex gap-2 mt-4 font-medium text-gray-400 " >
              <span><a href="#">© Task</a></span>
              <span><a href="#">Contact</a></span>
              <span><a href="#">Privacy & terms</a></span>
            </div>
          </div>
  );
}

export default Footer;
