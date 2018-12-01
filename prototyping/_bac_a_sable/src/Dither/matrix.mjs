// Spatial (error diffusion)
export const atkinson = [
  {
    x: 1,
    y: 0,
    weight: 1 / 8
  },
  {
    x: 2,
    y: 0,
    weight: 1 / 8
  },
  {
    x: -1,
    y: 1,
    weight: 1 / 8
  },
  {
    x: 0,
    y: 1,
    weight: 1 / 8
  },
  {
    x: 1,
    y: 1,
    weight: 1 / 8
  },
  {
    x: 0,
    y: 2,
    weight: 1 / 8
  }
]

export const burkes = [
  {
    x: 1,
    y: 0,
    weight: 8 / 32
  },
  {
    x: 2,
    y: 0,
    weight: 4 / 32
  },
  {
    x: -2,
    y: 1,
    weight: 2 / 32
  },
  {
    x: -1,
    y: 1,
    weight: 4 / 32
  },
  {
    x: 0,
    y: 1,
    weight: 8 / 32
  },
  {
    x: 1,
    y: 1,
    weight: 4 / 32
  },
  {
    x: 2,
    y: 1,
    weight: 2 / 32
  }
]

export const floydSteinberg = [
  {
    x: 1,
    y: 0,
    weight: 7 / 16
  },
  {
    x: -1,
    y: 1,
    weight: 3 / 16
  },
  {
    x: 0,
    y: 1,
    weight: 5 / 16
  },
  {
    x: 1,
    y: 1,
    weight: 1 / 16
  }
]

export const jarvisJudiceNinke = [
  {
    x: 1,
    y: 0,
    weight: 7 / 48
  },
  {
    x: 2,
    y: 0,
    weight: 5 / 48
  },
  {
    x: -2,
    y: 1,
    weight: 3 / 48
  },
  {
    x: -1,
    y: 1,
    weight: 5 / 48
  },
  {
    x: 0,
    y: 1,
    weight: 7 / 48
  },
  {
    x: 1,
    y: 1,
    weight: 5 / 48
  },
  {
    x: 2,
    y: 1,
    weight: 3 / 48
  },
  {
    x: -2,
    y: 2,
    weight: 1 / 48
  },
  {
    x: -1,
    y: 2,
    weight: 3 / 48
  },
  {
    x: 0,
    y: 2,
    weight: 5 / 48
  },
  {
    x: 1,
    y: 2,
    weight: 3 / 48
  },
  {
    x: 2,
    y: 2,
    weight: 1 / 48
  }
]

export const sierra2 = [
  {
    x: 1,
    y: 0,
    weight: 4 / 16
  },
  {
    x: 2,
    y: 0,
    weight: 3 / 16
  },
  {
    x: -2,
    y: 1,
    weight: 1 / 16
  },
  {
    x: -1,
    y: 1,
    weight: 2 / 16
  },
  {
    x: 0,
    y: 1,
    weight: 3 / 16
  },
  {
    x: 1,
    y: 1,
    weight: 2 / 16
  },
  {
    x: 2,
    y: 1,
    weight: 1 / 16
  }
]

export const sierra3 = [
  {
    x: 1,
    y: 0,
    weight: 5 / 32
  },
  {
    x: 2,
    y: 0,
    weight: 3 / 32
  },
  {
    x: -2,
    y: 1,
    weight: 2 / 32
  },
  {
    x: -1,
    y: 1,
    weight: 4 / 32
  },
  {
    x: 0,
    y: 1,
    weight: 5 / 32
  },
  {
    x: 1,
    y: 1,
    weight: 4 / 32
  },
  {
    x: 2,
    y: 1,
    weight: 2 / 32
  },
  {
    x: -1,
    y: 2,
    weight: 2 / 32
  },
  {
    x: 0,
    y: 2,
    weight: 3 / 32
  },
  {
    x: 1,
    y: 2,
    weight: 2 / 32
  }
]

export const sierraLite = [
  {
    x: 1,
    y: 0,
    weight: 2 / 4
  },
  {
    x: -1,
    y: 1,
    weight: 1 / 4
  },
  {
    x: 0,
    y: 1,
    weight: 1 / 4
  }
]

export const stucki = [
  {
    x: 1,
    y: 0,
    weight: 8 / 42
  },
  {
    x: 2,
    y: 0,
    weight: 4 / 42
  },
  {
    x: -2,
    y: 1,
    weight: 2 / 42
  },
  {
    x: -1,
    y: 1,
    weight: 4 / 42
  },
  {
    x: 0,
    y: 1,
    weight: 8 / 42
  },
  {
    x: 1,
    y: 1,
    weight: 4 / 42
  },
  {
    x: 2,
    y: 1,
    weight: 2 / 42
  },
  {
    x: -2,
    y: 2,
    weight: 1 / 42
  },
  {
    x: -1,
    y: 2,
    weight: 2 / 42
  },
  {
    x: 0,
    y: 2,
    weight: 4 / 42
  },
  {
    x: 1,
    y: 2,
    weight: 2 / 42
  },
  {
    x: 2,
    y: 2,
    weight: 1 / 42
  }
]

// Ordered (threshold)
export const bayer16 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5
]

export const bayer64 = [
  0, 48, 12, 60, 3, 51, 15, 63,
  32, 16, 44, 28, 35, 19, 47, 31,
  8, 56, 4, 52, 11, 59, 7, 55,
  40, 24, 36, 20, 43, 27, 39, 23,
  2, 50, 14, 62, 1, 49, 13, 61,
  34, 18, 46, 30, 33, 17, 45, 29,
  10, 58, 6, 54, 9, 57, 5, 53,
  42, 26, 38, 22, 41, 25, 37, 21
]
