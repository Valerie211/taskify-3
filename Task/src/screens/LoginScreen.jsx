import Footer from "../components/login/Footer";
import Login from "../components/login/Login"
import logo from '../assets/taskify-logo.png'


const LoginScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#F3F3F3]">
    <h2 className="text-center text-2xl font-bold mb-4 text-[#7469B6]">
    <img src={logo} alt="log"/>
     </h2>
      <Login/>
      <div className="mt-4">
      <Footer/>
      </div>
     
    </div>
  );
}

export default LoginScreen;
