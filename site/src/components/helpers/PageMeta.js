import React from 'react';
import Helmet from 'react-helmet';

function PageMeta(props) {

    const {
        title,
        description
    } = props;

    return (
      <Helmet>
        <title>{title}</title>

        {/* REGULAR META */}
        <meta name="author" content="médialab Sciences Po" />
        <meta name="description" content={description} />
        {/* END REGULAR META */}

        {/* META DUBLIN CORE */}
        <meta name="DC.Title" lang="fr" content={title} />
        {/* END META DUBLIN CORE */}

        {/* META TWITTER */}
        <meta name="twitter:card" value="summary" />
        <meta name="twitter:site" content="https://medialab.sciencespo.fr" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@medialab" />
        {/* <meta name="twitter:image" content={imageUrl}> */}
        {/* end meta twitter */}

        {/* META GOOGLE */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        {/* <meta itemprop="image" content={imageUrl}> */}
        {/* END META GOOGLE + */}

        {/* META OPEN GRAPH / FACEBOOK */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        {/*<meta property="og:url" content={url}/> */}
        <meta property="og:description" content={description} />
        {/* END META OPEN GRAPH / FACEBOOK*/}
      </Helmet>
    );
}

export default PageMeta;
