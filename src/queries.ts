import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query {
    current_user {
      _id
      name
      email
    }
  }
`;
