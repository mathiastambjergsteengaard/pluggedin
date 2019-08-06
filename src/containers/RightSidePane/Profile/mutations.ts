import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation LoginMution($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
