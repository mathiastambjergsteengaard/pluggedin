import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    setContext((operation, context) => {
      console.log(operation);
      console.log(context);
      // // get the authentication token from local storage if it exists
      const token = localStorage.getItem("token");
      // // return the headers to the context so httpLink can read them
      return {
        headers: {
          authorization: token
        }
      };
    }),
    new HttpLink({
      uri: "http://localhost:3000/graphql",
      credentials: "same-origin"
    })
  ]),
  cache: new InMemoryCache()
});
