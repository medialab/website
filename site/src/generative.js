const BLOCKS = ['\u2591', '\u2592', '\u2593', '\u2588'];

// NOTE: check ./specs/processing.js
const RATIO = 9 / (4 / 3) / 19;

export function levenshteinGenerativePattern(a, b, options = {}) {

  // NOTE: could also play on this
  if (a.length < b.length) {
    [a, b] = [b, a];
  }

  const width = options.rows;
  const height = (width * RATIO) | 0;

  // Clamping?
  if (a.length > width)
    a = a.slice(0, width);

  if (b.length > height)
    b = b.slice(0, height);

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      let value;

      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        value = matrix[i - 1][j - 1];
      }
      else {
        value = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }

      matrix[i][j] = value;
    }
  }

  const r = options.rotate || 1;
  const scheme = 'rotationScheme' in options ? options.rotationScheme : 1;
  const sparsity = 'sparsity' in options ? options.sparsity : 1;
  const map = (new Array(sparsity)).fill('\u00A0').concat(BLOCKS);

  let blocks = matrix.map((row, i) => {
    let chars = row.map((_, j) => {

      // Rotating
      let t;

      if (scheme)
        t = row[(i * r + j) % row.length];
      else
        t = row[i * ((r + j) % row.length)];

      return map[t % map.length];
    }).join('');

    // Horizontal padding
    if (chars.length < width) {
      const times = Math.ceil(width / chars.length);

      chars += chars.repeat(times);
      chars = chars.slice(0, width);
    }

    return chars;
  });

  // Vertical padding
  if (blocks.length < height) {
    let o = 0;

    while (blocks.length < height) {
      blocks.push(blocks[o]);
      o++;
    }
  }

  return blocks.join('');
}
