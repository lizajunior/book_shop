const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './js/bookApi.js', // Входной файл
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Папка для выходных файлов
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Обработка .js файлов
        exclude: /node_modules/,
        use: 'babel-loader', // Если нужен Babel для транспиляции
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,// Извлекает CSS в отдельный файл
          'css-loader',// Обрабатывает CSS-файлы (импорты, минификация)
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Имя для итогового CSS-файла
    }),
  ],

  output: {
    filename: 'bundle.js', // Имя итогового JS-файла
    path: __dirname + '/dist', // Путь для сборки
  },

  mode: 'development', // Для production используйте 'production'
};