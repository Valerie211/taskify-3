
import Dashboard from '../components/Dashboard/Dashboard';
import LatestProject from '../components/ProjectOverview/LatestProject';
import ProjectOverview from '../components/ProjectOverview/ProjectOveriew';

const DashboardScreen = () => {
  return (
    <div className='p-4'>
      <Dashboard/>
     <div className='flex gap-4 mt-4'>
     <ProjectOverview/>
      <LatestProject/>
     </div>
    </div>
  );
}

export default DashboardScreen;
