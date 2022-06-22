import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import '../styles/globals.css';
import Page from '../components/Page';
import store from '../store/index';
import { Provider } from 'react-redux';
const apollo = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
      <Provider store={store}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
