export function replaceAssetPaths(assets, content) {
  if (!content)
    return;

  assets.edges.forEach(({node: {base, publicURL}}) => {
    if (content.fr)
      content.fr = content.fr.replace(base, publicURL);

    if (content.en)
      content.en = content.en.replace(base, publicURL);
  });
}
