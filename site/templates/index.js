import React from 'react';

import Layout from '../components/Layout';
import Home from '../components/home/Home';

const IndexPage = ({data, pageContext}) => {
  // console.log(data, pageContext);

  return (
    <Layout
      lang={pageContext.lang}
      className="page-home body-page"
      permalinks={pageContext.permalinks}>
      <Home
        lang={pageContext.lang}
        grid={data.grid}
        slider={data.slider}
        rdv={data.rdv}
        bskyposts={data.bluesky}
        github={data.github}
      />
    </Layout>
  );
};

export default IndexPage;
