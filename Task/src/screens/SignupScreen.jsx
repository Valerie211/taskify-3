import SignUp from "../components/Signup/Signup";
import logo from '../assets/taskify-logo.png'

const SignupScreen = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#F3F3F3]">
    <img src={logo} alt="log"/>
      <div>
      <SignUp/>
      </div>
    </div>
  );
}

export default SignupScreen;
