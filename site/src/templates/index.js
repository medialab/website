import React from 'react';

import Layout from '../components/Layout';
import Home from '../components/home/Home';

const IndexPage = ({data, pageContext}) => {
  // console.log(data, pageContext);

  const grid = data.settingsJson.home.grid.filter(item => !!item.data);
  const slider = data.settingsJson.home.slider.filter(item => !!item.data);
  const rdv = data.rdv ? data.rdv.edges.map(({node}) => node).filter(node => !!node) : [];
  const tweets = data.tweets ? data.tweets.edges.map(({node}) => node) : [];
  const github = data.github ? data.github.edges.map(({node}) => node) : [];

  return (
    <Layout
      lang={pageContext.lang}
      className="page-home body-page"
      permalinks={pageContext.permalinks}>
      <Home
        lang={pageContext.lang} grid={grid} slider={slider}
        rdv={rdv}
        tweets={tweets}
        github={github} />
    </Layout>
  );
};

export default IndexPage;
