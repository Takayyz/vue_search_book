'use strict'
const merge = require('webpack-merge')
const dotenv = require('../.env')

module.exports = merge(dotenv, {
  NODE_ENV: '"production"'
})
