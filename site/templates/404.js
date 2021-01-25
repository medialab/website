import React from 'react';
import Link from '../components/helpers/Link';
import Layout from '../components/Layout';

import ProcessedImage from '../components/helpers/ProcessedImage.js';

const DUMMY_PERMALINKS = {
  fr: '',
  en: '/en'
};

export default function Page404() {
  return (
    <Layout
      lang="fr"
      permalinks={DUMMY_PERMALINKS}
      className="page-404 body-page">
      <div className="pattern-container">
        <ProcessedImage
          size="large"
          data={{title: {fr: 'oh rage oh désespoir', en: 'desmond toutou'}}}
        />
      </div>
      <div className="not-found-container">
        <div className="not-found not-found-fr">
          <h1>
            Oups !<br /> page non trouvée
          </h1>
          <p>
            Nous ne parvenons pas à atteindre la page que vous recherchez. L'URL
            est peut-être incorrecte ou la page n'existe plus.
            <br />
            Vous pourrez retrouver tous nos contenus à partir de{' '}
            <Link to="/">l'accueil</Link>.
          </p>
        </div>

        <div className="not-found not-found-en">
          <h1>
            Oups !<br /> page not found
          </h1>
          <p>
            We cannot reach the page you are looking for. The URL is maybe
            incorrect or the page does not exist anymore.
            <br />
            You can find all our content from the{' '}
            <Link to="/en/">homepage</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
