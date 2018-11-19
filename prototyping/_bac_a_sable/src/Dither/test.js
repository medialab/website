'use strict'

const { ok, equal } = require('tapeless')
const { matrix, ordered } = require('./')

const filter = ordered()
const { data } = filter()

equal(typeof filter, 'function', 'returns lambda on init', 'will default')
equal(data.length, 0)

const keys = 'floydSteinberg bayer64'.split(' ')

for (const k of keys) {
  ok(k in matrix)
}

const source = { data: Uint8ClampedArray.from([1, 2, 3, 4]), width: 1 }
const result = filter(source)

equal(result.data.length, source.data.length, 'input/output size is a match', 'will operate')
