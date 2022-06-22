import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import '../styles/globals.css';
import Page from '../components/Page';
import { CartStateProvider } from '../utils.js/cartState';

const apollo = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

export default MyApp;
