if (window !== window.top) {
  document.documentElement.classList.add('is-iframe')
}

const params = [
  {
    nature: 'ordered',
    lookup: 'bayer16'
  },
  {
    nature: 'ordered',
    lookup: 'bayer64'
  },
  {
    nature: 'spatial',
    lookup: 'atkinson'
  },
  {
    nature: 'spatial',
    lookup: 'sierra2'
  },
  {
    nature: 'spatial',
    lookup: 'stucki'
  }
]

const boards = document.querySelectorAll('canvas')
const { src: master } = document.querySelector('img')

Array.from(boards).forEach((canvas, i) => {
  const target = canvas.getContext('2d')
  const shadow = canvas.cloneNode().getContext('2d')
  const worker = new Worker('worker.js')

  worker.addEventListener('message', (e) => {
    target.putImageData(e.data.result, 0, 0)
  })

  const buffer = document.createElement('img')
  const config = params[i]

  buffer.addEventListener('load', () => {
    shadow.drawImage(buffer, 0, 0)

    const source = shadow.getImageData(0, 0, canvas.width, canvas.height)

    worker.postMessage({ config, source })
  })

  canvas.parentNode.setAttribute('title', config.lookup)
  buffer.setAttribute('src', master)
})
