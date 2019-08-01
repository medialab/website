import React from 'react';
import Helmet from 'react-helmet';

import coverFb from '../assets/images/cover-fb.png';
import coverTwitter from '../assets/images/cover-twitter.png';

const typeToDublinCoreMapping = {
  article: 'Text',
  book: 'Text',
  communication: 'Text',
  thesis: 'Text',
  grey: 'Text',
  datascape: 'InteractiveResource',
  website: 'InteractiveResource',
  software: 'Software',
  code: 'Software',
  exhibition: '',
  simulation: 'Event',
  workshop: 'Event',
  conference: 'Event',
  media: 'Event',
};

const buildOpenGraphAdditionalMeta = obj => {
  switch(obj.type) {
    case 'book':
      return [
          <meta key={'type'} property="og:type" content="book" />,
          <meta key={'author'} property="og:book:author" content={obj.author} />,
          <meta key={'time'} property="og:book:release_date" content={obj.date} />
        ]
    case 'post':
    case 'article':
      return [
          <meta key={'type'} property="og:type" content="article" />,
          <meta key={'author'} property="og:article:author" content={obj.author} />,
          <meta key={'time'} property="og:article:published_time" content={obj.date} />
      ]
    default:
      return <meta property="og:type" content="website" />;
  }
}

function PageMeta(props) {

    const {
        title = 'médialab Sciences Po',
        citationTitle,
        zoteroType,
        description,
        date,
        author,
        lang = 'fr',
        citation,
        type,
        uri,
        imageData,
    } = props;

    const imageSrc = imageData && imageData.url ?  'https://medialab.sciencespo.fr/' + imageData.url : 'https://medialab.sciencespo.fr' + coverTwitter;
    const imageWidth = imageData && imageData.width ? imageData.width : 2000;
    const imageHeight = imageData && imageData.height ? imageData.height : 1000;

    return (
      <Helmet>
        <title>{title}</title>

        {/* REGULAR META */}
        <meta name="author" content={author ? author : 'médialab Sciences Po'} />
        <meta name="description" content={description} />
        {/* END REGULAR META */}
        {/* ZOTERO META */}
        {uri && <meta name="citation_public_url" content={uri}/>}
        <meta name="z:itemType" content={zoteroType}></meta>
        {citationTitle && <meta name="citation_title" content={citationTitle}/>}
        {/* END ZOTERO META */}

        {/* META DUBLIN CORE */}
        <link rel="schema.DC" href="http://purl.org/dc/elements/1.1/" />
        <link rel="schema.DCTERMS" href="http://purl.org/dc/terms/" />
        <meta name="DC.format" scheme="DCTERMS.IMT" content="text/html" />
        <meta name="DC.Title" lang={lang} content={citationTitle || title} />
        {date && <meta name="DC.date" content={date} />}
        {date && <meta name="DC.language" content={lang} />}
        {uri && <meta name="DCTERMS.uri" lang={lang} content={uri} />}
        <meta name="DCTERMS.description" lang={lang} content={description} />
        {date && <meta name="DCTERMS.issued" scheme="DCTERMS.W3CDTF" content={date} />}
        {author && Array.isArray(author) ?
            author.map((a, i) => <meta name="DCTERMS.creator" key={i} content={a} /> )
        : <meta name="DCTERMS.creator" content={author} />
        }
        {citation && <meta name="DCTERMS.bibliographicCitation" content={citation} />}
        {type && !zoteroType && typeToDublinCoreMapping[type] && <meta name="DCTERMS.type" content={typeToDublinCoreMapping[type]} />}
        {/* END META DUBLIN CORE */}

        {/* META TWITTER */}
        <meta name="twitter:card" value="summary" />
        <meta name="twitter:site" content="https://medialab.sciencespo.fr" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@medialab" />
        <meta name="twitter:image" content={imageSrc} />
        {/* end meta twitter */}

        {/* META GOOGLE */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={imageSrc} />
        {/* END META GOOGLE + */}

        {/* META OPEN GRAPH / FACEBOOK */}
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="médialab Sciences Po" />        
        <meta property="og:url" content={uri ? uri : 'https://medialab.sciencespo.fr'} />
        <meta property="og:description" content={description} />
        <meta property="og:image:url" content={imageSrc} />
        <meta property="og:image:secure_url" content={imageSrc} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="médialab website image" />
        <meta property="og:image:width" content={imageWidth} />
        <meta property="og:image:height" content={imageHeight} />
        {buildOpenGraphAdditionalMeta(props)}
        {/* END META OPEN GRAPH / FACEBOOK*/}
      </Helmet>
    );
}

export default PageMeta;
