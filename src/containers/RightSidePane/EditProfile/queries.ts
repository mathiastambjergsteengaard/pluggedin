import gql from "graphql-tag";

export const USER_QUERY = gql`
  query IUser($id: Int!) {
    user {
      _id
      name
      email
    }
  }
`;
