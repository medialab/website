importScripts('dither.js')

self.addEventListener('message', (e) => {
  const { config, source } = e.data

  const filter = dither[config.nature]
  const lookup = dither.matrix[config.lookup]

  self.postMessage({
    result: filter(lookup)(source)
  })
})
