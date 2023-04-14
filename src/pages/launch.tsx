import Navbar from '../components/navbar';
import LaunchList from '../components/launchList';
import './launch.css';

// interface launchData {
//   launches: Launch;
// }

// interface PostVars {
//   mission_name?: string;
// }

const Launch = () => {
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="p-5 rounded wireframe">
          <h1>SpaceX Launch Schedule</h1>
          <LaunchList />
        </div>
      </main>
    </>
  )
}

export default Launch;
