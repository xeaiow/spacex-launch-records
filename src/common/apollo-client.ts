import { ApolloClient, InMemoryCache } from '@apollo/client';
import { typePolicies } from './typePolicy';
import { typeDefs } from "./typeDefs";

const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache(typePolicies),
  typeDefs,
});

export default client;
