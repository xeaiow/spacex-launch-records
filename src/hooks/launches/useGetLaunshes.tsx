import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
  query GetLaunch {
    launches {
      id
      mission_name
      launch_date_local
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;
