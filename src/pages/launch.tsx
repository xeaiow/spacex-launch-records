import Navbar from '../components/navbar';
import LaunchList from '../components/launchList';
import Pagination from '../components/pagination';
import './launch.css';

const Launch = () => {
  const cleanSearch = () => {
    
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="p-2 rounded wireframe">
          <div className="row justify-content-between pb-4">
            <div className="col">
              <h1>SpaceX Launch Schedule</h1>
            </div>
          </div>
          <LaunchList />
          <Pagination />
        </div>
      </main>
    </>
  )
}

export default Launch;
