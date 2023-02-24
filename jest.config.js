/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  // clearMocks: true,
  // collectCoverage: true,
  // coverageDirectory: "coverage",
  coverageProvider: "v8",
  globals: {
    "vue-jest": {
      babelConfig: false,
      tsConfig: {
        importHelpers: true,
      },
    },
  },
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    "^.+\\.[jt]sx?$": "babel-jest"
  }
};
