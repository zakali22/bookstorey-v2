import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const { getClient } = registerApolloClient(() => {
  const token = process.env.HARDCOVER_API_TOKEN;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://api.hardcover.app/v1/graphql",
      // In Node (server) you can pass headers safely:
      headers: token ? { authorization: `Bearer ${token}` } : undefined,
    }),
  });
});
