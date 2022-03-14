import Head from 'next/head'
import '../assets/scss/app.scss'

const App = ({ Component, pageProps }) => {
  return (
    <div>
      <Head>
        <title>Ledger Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container pl-2 pr-2">
        <h1 className="title" data-cy="brand-title">
          <span className="has-text-primary">Ledger Demo</span>
          &nbsp;
          <span className="has-text-secondary">PRO</span>
        </h1>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default App;