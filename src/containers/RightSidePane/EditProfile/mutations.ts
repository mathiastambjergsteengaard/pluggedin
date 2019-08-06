import gql from "graphql-tag";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($_id: ID!, $name: String!) {
    updateUser(_id: $_id, name: $name) {
      _id
      name
    }
  }
`;
