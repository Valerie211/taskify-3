import { Route,Routes } from 'react-router-dom';
import LoginScreen from '../screens/LoginScreen';
import DashboardLayout from '../components/Layout/DashboardLayout';
import TaskScreen from '../screens/TaskScreen';
import {ProjectManagerUsersReflection,ChatScreen,ReflectionForManagerScreen,ReflectionScreen,TeamMemberTaskScreen,SignupScreen,DashboardScreen,ProjectScreen,ProjectCardsScreen,HomeScreen} from './index';
import { jwtDecode } from 'jwt-decode';
const Router = () => {
  // const user = {}
  // const token= JSON.parse(localStorage.getItem('token')) ;
  // if (token && typeof token === 'string' && token.length > 0) {
  //   user = jwtDecode(token);
  // }
  // console.log(user);
  return (
    <Routes>
      <Route path='/' element={<HomeScreen/>}/>
      <Route path='/register' element={<SignupScreen/>} />
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/chat' element={<DashboardLayout Title={"Chat"} ><ChatScreen/></DashboardLayout>}/>
      <Route path='/team-member/task/:project_id' element={<DashboardLayout Title={"Team member tasks"}><TeamMemberTaskScreen/></DashboardLayout>}/>
      <Route path="/reflection/:id" element={<DashboardLayout Title={"Team member reflection"}><ReflectionScreen/></DashboardLayout>}/>
      {
  
        <>
      <Route path='/users-reflection' element={<DashboardLayout Title={"User reflection"}><ProjectManagerUsersReflection/></DashboardLayout>}/>
      <Route path='/reflection-for-manager/:id' element={<DashboardLayout Title={"Reflections"}><ReflectionForManagerScreen/></DashboardLayout>}/>
      <Route path='/task/:project_id' element={<DashboardLayout Title={"Tasks"}><TaskScreen/></DashboardLayout>}/>
      <Route path="/projects" element={<DashboardLayout Title={"Projects"}><ProjectCardsScreen/></DashboardLayout>}/>
      </>
      }
      <Route path='/dashboard' element={<DashboardLayout Title={"Dashboard"}><DashboardScreen/></DashboardLayout>}/>
      <Route path="/project" element={<DashboardLayout Title={"Projects"}><ProjectScreen/></DashboardLayout>}/>
      <Route path='*' element={<h1>Not Found</h1>}/>
    </Routes>
  );
}

export default Router;
