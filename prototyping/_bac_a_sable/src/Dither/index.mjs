import * as matrix from './matrix.mjs'

export const ordered = (table = matrix.bayer64) => {
  const steps = Math.sqrt(table.length)
  const scale = table.length / 255

  return (input = { data: [], width: 0 }) => {
    const frame = new Uint8ClampedArray(input.data.buffer)
    const width = input.width

    for (let i = 0, stop = frame.length; i < stop; i += 4) {
      const r = frame[i]
      const g = frame[i + 1]
      const b = frame[i + 2]

      const color = [r, g, b]

      const j = i * 0.25

      const x = j % steps
      const y = Math.floor(j / width) % steps

      const limit = table[(x * steps) + y]
      const pixel = color.map(v => (v * scale > limit ? 255 : 0))

      frame.set(pixel, i)
    }

    return input
  }
}

export const spatial = (model = matrix.floydSteinberg) => {
  const steps = model.length * 3

  return (input = { data: [], width: 0 }) => {
    const { data, width } = input

    // Reformat lookup table
    const table = model.map(v => (v.x * 4) + (v.y * 4 * width))

    for (let i = 0, stop = data.length; i < stop; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      const color = [r, g, b]

      // Quantize (8 color palette)
      const pixel = color.map(v => (v > 127 ? 255 : 0))

      // Compute error
      const error = color.map(v => (v > 127 ? v - 255 : v))

      // Diffuse error
      for (let j = 0; j < steps; j += 1) {
        const x = j % 3
        const y = Math.floor(j / 3)

        const e = error[x] * model[y].weight
        const k = table[y] + x + i

        data[k] += Math.floor(e)
      }

      data.set(pixel, i)
    }

    return input
  }
}

export { matrix }
