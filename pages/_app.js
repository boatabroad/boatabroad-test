import { Router } from 'next/router';
import Head from 'next/head';
import ProgressBar from '@badrap/bar-of-progress';
import 'styles/globals.css';

const progress = new ProgressBar({
  size: 2,
  color: '#00BFC1',
  className: 'z-50',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Boatabroad - Boat Rentals</title>
        <link rel="icon" href="/icon.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
