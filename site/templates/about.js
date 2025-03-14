import React from 'react';

import Layout from '../components/Layout';
import About from '../components/About';

export default ({pageContext}) => {
  // console.log(data, pageContext);

  return (
    <Layout
      lang={pageContext.lang}
      className="body-page page-about"
      permalinks={pageContext.permalinks}>
      <About lang={pageContext.lang} />
    </Layout>
  );
};
