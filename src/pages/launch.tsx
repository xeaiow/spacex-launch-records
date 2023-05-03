import Navbar from '../components/navbar';
import LaunchList from '../components/launchList';
import Pagination from '../components/pagination';
import CleanSearch from '../components/cleanSearch';
import { useReactiveVar } from '@apollo/client';
import { filteredLaunchesVar, launchesVar } from '../common/cache';
import './launch.css';

const Launch = () => {
  const filteredLaunchData = useReactiveVar(filteredLaunchesVar);
  const launchesData = useReactiveVar(launchesVar);

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="p-2 rounded wireframe">
          <div className="row justify-content-between pb-4">
            <div className="col-10">
              <h1>SpaceX Launch Schedule</h1>
            </div>
            <div className="col-2">
              {
                launchesData?.length !== filteredLaunchData?.length && <CleanSearch />
              }
            </div>
          </div>
          <LaunchList />
          {
            filteredLaunchData?.length !== 1 && <Pagination />
          }
          {
            filteredLaunchData?.length > 0 && <div>Found {filteredLaunchData?.length} records.</div>
          }
        </div>
      </main>
    </>
  )
}

export default Launch;
