import { fileURLToPath } from 'node:url'
import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  devtool: 'eval-source-map',
  devServer: {
    watchFiles: ['./src/index.js'],
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: '/\.css$/i',
        use: ['style-loader', 'css-loader'],
      },
      {
        test: '/\.woff2$/i',
        use: 'asset/resource'
      },
    ],
  },
}
