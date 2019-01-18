> 3-bit web worker friendly implementation of common dithering algorithms, ordered and spatial

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/dither
```

### Usage
```js
import { spatial as bender } from '@thewhodidthis/dither'

const source = document.createElement('img')
const target = document.createElement('canvas').getContext('2d')

const canvas = Object.assign(target.canvas, { width: 180, height: 180 })

// The Floyd/Steinberg variety is default
const filter = bender()

source.addEventListener('load', () => {
    target.drawImage(source, 0, 0)

    const pixels = target.getImageData(0, 0, canvas.width, canvas.height)
    const result = filter(pixels)

    target.putImageData(result, 0, 0)

    document.body.appendChild(canvas)
})

source.setAttribute('crossOrigin', 'anonymous')
source.setAttribute('src', `//source.unsplash.com/random/${canvas.width}x${canvas.height}`)
`````

### References
- [meemooapp](https://github.com/meemoo/meemooapp/blob/master/src/nodes/image-monochrome-worker.js)
- [FlickrDithr](https://github.com/flickr/FlickrDithr/blob/master/dither.js)
