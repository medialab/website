import React from 'react';
import Layout from '../components/Layout';
import {withPrefix} from 'gatsby';

const DUMMY_PERMALINKS = {
  fr: withPrefix(''),
  en: withPrefix('/en')
};

export default function() {
  return (
    <Layout
      lang="fr"
      permalinks={DUMMY_PERMALINKS}
      className="page-404 body-page">
      404 NOT FOUND!
    </Layout>
  );
}
