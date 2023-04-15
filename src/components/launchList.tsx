import { Launch } from '../interfaces/launch';
import LoadingPage from './loadingPage';
import { GET_LAUNCHES } from '../hooks/launches/useGetLaunshes';
import { useQuery, useReactiveVar } from '@apollo/client';
import {
  launchesVar,
  totalPagesVar,
  currentPageVar,
  filteredLaunchesVar
} from '../common/cache';
import { prettyDateFormat, unixConvertDate } from '../utils/date';

const LaunchList = () => {
  const filteredLaunchData = useReactiveVar(filteredLaunchesVar);
  const currentPage = useReactiveVar(currentPageVar);
  const perPage = 20;

  const { loading, } = useQuery(GET_LAUNCHES, {
    onCompleted: (data) => {
      launchesVar(data?.launches);
      filteredLaunchesVar(data?.launches);

      const pagination = Math.ceil(data?.launches.length / perPage);
      totalPagesVar(pagination);
    }
  });

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const getLaunches = filteredLaunchData.slice(start, end);

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
            launch_date_unix,
            rocket: { rocket_name, rocket_type }
          }: Launch) => (
            <tr key={`${id}-${mission_name}`}>
              <td>
                {mission_name}
              </td>
              <td>
                {unixConvertDate(launch_date_unix)}
                <br />
                {prettyDateFormat(launch_date_local)}
              </td>
              <td>
                {rocket_name}</td>
              <td>
                {rocket_type}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
};

export default LaunchList;
