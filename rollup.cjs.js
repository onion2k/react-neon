import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  external: [ 'twgl.js', 'react', 'react-dom' ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  output: {
      name: 'neon',
      file: 'dist/index.babel.js',
      exports: 'named',
      format: 'cjs',
      globals: {
          'twgl.js': 'twgl',
          'react': 'React',
          'react-dom': 'ReactDOM'
      }
  }
};