import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import '../styles/globals.css';
import Page from '../components/Page';

const apollo = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

export default MyApp;
