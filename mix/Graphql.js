module.exports = class Graphql {
  name() {
    return 'graphql';
  }

  dependencies() {
    return ['graphql', 'graphql-tag']
  }

  webpackRules() {
    return {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    }
  }
}
