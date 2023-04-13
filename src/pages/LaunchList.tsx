import { GET_LAUNCHES } from '../hooks/launches/useGetLaunshes';
import { useQuery } from '@apollo/client';
import { Launch } from '../interfaces/launch';

const LaunchList = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: error.message</div>;
  }

  return data?.launches?.map(({
    id,
    mission_name,
    launch_date_local,
    rocket: { rocket_name, rocket_type }
  }: Launch) => (
    <div key={id}>
      <h3>{mission_name}</h3>
      <br />
      <p>{launch_date_local}</p>
      <p>{rocket_name}</p>
      <p>{rocket_type}</p>
    </div>
  ));

}

export default LaunchList;
