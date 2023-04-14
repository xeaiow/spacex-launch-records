import { Launch } from '../interfaces/launch';
import LoadingPage from './loadingPage';
import ErrorPage from './errorPage';
import { GET_LAUNCHES } from '../hooks/launches/useGetLaunshes';
import { useQuery, useReactiveVar } from '@apollo/client';
import { launchesVar } from '../common/cache';

const LaunchList = () => {
  const launchesData = useReactiveVar(launchesVar);
  const { loading, error } = useQuery(GET_LAUNCHES, {
    onCompleted: (data) => {
      launchesVar(data?.launches);
    }
  });

  if (loading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorPage />
  }

  return (
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
          launchesData?.map(({
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
  )
};

export default LaunchList;
