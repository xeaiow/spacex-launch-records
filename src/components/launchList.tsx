import { Launch } from '../interfaces/launch';
import LoadingPage from './loadingPage';
import { GET_LAUNCHES } from '../hooks/launches/useGetLaunshes';
import { useQuery, useReactiveVar } from '@apollo/client';
import { launchesVar, totalPagesVar, currentPageVar } from '../common/cache';

const LaunchList = () => {
  const launchesData = useReactiveVar(launchesVar);
  const currentPage = useReactiveVar(currentPageVar);
  const perPage = 20;

  const { loading, } = useQuery(GET_LAUNCHES, {
    onCompleted: (data) => {
      launchesVar(data?.launches);

      const pagination = Math.ceil(data?.launches?.length / perPage);
      totalPagesVar(pagination);
    }
  });

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const getLaunches = launchesData.slice(start, end);

  if (loading) {
    return <LoadingPage />
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
          getLaunches?.map(({
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
