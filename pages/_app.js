import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import '../styles/globals.css';
import Page from '../components/Page';
import { store, persistor } from '../store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const apollo = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
