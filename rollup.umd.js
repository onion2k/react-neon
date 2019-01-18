import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  external: ["twgl.js", "react", "react-dom", "resize-observer"],
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ],
  output: {
    name: "neon",
    file: "dist/index.umd.js",
    exports: "named",
    format: "umd",
    globals: {
      "twgl.js": "twgl",
      react: "React",
      "react-dom": "ReactDOM",
      "resize-observer": "resizeObserver"
    }
  }
};
