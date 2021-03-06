import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

const utils = require('./utils')

export default [
  {
    input: 'index.common.js',
    output: 'vue-showdown.js',
    format: 'umd',
    globals: {
      showdown: 'showdown',
    },
  },
  {
    input: 'index.common.js',
    output: 'vue-showdown.min.js',
    format: 'umd',
    globals: {
      showdown: 'showdown',
    },
  },
  {
    input: 'index.common.js',
    output: 'vue-showdown.common.js',
    format: 'cjs',
  },
  {
    input: 'index.js',
    output: 'vue-showdown.esm.js',
    format: 'es',
  },
].map(opts => {
  const config = {
    input: utils.srcPath(opts.input),
    output: {
      file: utils.distPath(opts.output),
      format: opts.format,
      name: 'VueShowdown',
      globals: opts.globals,
      banner: utils.banner,
    },
    external: ['showdown'],
    plugins: [
      resolve(),
      cjs(),
      babel(),
    ],
  }
  if (/min\.js$/.test(opts.output)) {
    config.plugins.push(uglify())
  }
  return config
})
