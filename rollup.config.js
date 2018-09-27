import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  external: [ 'react', 'react-dom' ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  output: {
      name: 'neon',
      file: 'dist/index.umd.js',
      exports: 'named',
      format: 'umd',
      globals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
      }
  }
};