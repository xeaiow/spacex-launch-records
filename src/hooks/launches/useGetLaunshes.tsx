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

export const GET_LAUNCH = gql`
  query($id: ID!) {
    launch(id: $id) {
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
