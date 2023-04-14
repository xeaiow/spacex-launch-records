import { GET_LAUNCHES } from '../hooks/launches/useGetLaunshes';
import { useQuery } from '@apollo/client';
import { Launch } from '../interfaces/launch';
import Navbar from '../components/navbar';
import './launchList.css';

interface launchData {
  launches: Launch;
}

interface PostVars {
  mission_name: string;
}

const LaunchList = () => {
  const { loading, error, data } = useQuery<launchData, PostVars>(GET_LAUNCHES, {
    variables: {
      mission_name: 'FalconSat'
    },
  });

  if (loading) {
    return (
      <div className="text-center loadingContainer">
        <div
          className="spinner-border spinner-size"
          style={{ width: 50, height: 50 }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: error.message</div>;
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="p-5 rounded wireframe">
          <h1>SpaceX Launch Schedule</h1>
          <table className="table table-hover">
            <thead className="table-condensed">
              <tr>
                <th>Mission</th>
                <th>Date</th>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {
                data?.launches?.map(({
                  id,
                  mission_name,
                  launch_date_local,
                  rocket: { rocket_name, rocket_type }
                }: Launch) => (
                  <tr key={`${id}-${mission_name}`}>
                    <td>{mission_name}</td>
                    <td>{launch_date_local}</td>
                    <td>{rocket_name}</td>
                    <td>{rocket_type}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default LaunchList;
