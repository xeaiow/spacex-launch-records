import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
  query GetLaunch {
    launches {
      id
      mission_name
      launch_date_local
      launch_date_unix
      launch_date_utc
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;
