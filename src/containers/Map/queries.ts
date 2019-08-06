import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query IUsers {
    users {
      _id
      x_coordinate
      y_coordinate
    }
  }
`;
