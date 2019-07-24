import React from 'react';
import Helmet from 'react-helmet';

function PageMeta(props) {

    const {
        title,
        description,
        date,
        author,
        lang = 'fr',
        citation,
    } = props;

    return (
      <Helmet>
        <title>{title}</title>

        {/* REGULAR META */}
        <meta name="author" content={author && author.length ? author : "médialab Sciences Po"} />
        <meta name="description" content={description} />
        {/* END REGULAR META */}

        {/* META DUBLIN CORE */}
        <link rel="schema.DC" href="http://purl.org/dc/elements/1.1/" />
        <link rel="schema.DCTERMS" href="http://purl.org/dc/terms/" />
        <meta name="DC.format" scheme="DCTERMS.IMT" content="text/html" />
        <meta name="DC.Title" lang={lang} content={title} />
        {date && <meta name="DC.date" content={date} />}
        {date && <meta name="DCTERMS.issued" scheme="DCTERMS.W3CDTF" content={date} />}
        {author && <meta name="DCTERMS.creator" content={author} />}
        {citation && <meta name="DCTERMS.bibliographicCitation" content={citation} />}
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
        <meta property="og:url" content={'https://medialab.sciencespo.fr'}/>
        <meta property="og:description" content={description} />
        {/* END META OPEN GRAPH / FACEBOOK*/}
      </Helmet>
    );
}

export default PageMeta;
