import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Import the store

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
