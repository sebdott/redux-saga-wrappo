const fs = require('fs');
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const paths = {
  appIndexJs: resolvePath('src/index.js'),
  appScripts: resolvePath('src'),
  destination: resolvePath('dist'),
  packageJson: resolvePath('package.json'),
};
const {name: library} = require(paths.packageJson);

module.exports = {
  mode: 'production',
  node: false,
  entry: paths.appIndexJs,
  output: {
    filename: `${library}.min.js`,
    library,
    libraryTarget: 'umd',
    path: paths.destination,
    umdNamedDefine: true,
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      cwd: process.cwd(),
    }),
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: /(node_modules)/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
