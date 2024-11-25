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
        test: /\.scss$/, // Обработка файлов .scss
        use: [
          MiniCssExtractPlugin.loader, // вместо style-loader используем этот плагин стили добавляются в DOM, стили будут вынесены в отдельные CSS-файлы, которые подключаются через <link>
          'css-loader',   // Обрабатывает CSS
          'sass-loader',  // Компилирует Sass в CSS
        ],
      },

      {
        test: /\.js$/, // Обработка .js файлов
        exclude: /node_modules/,
        use: 'babel-loader', // Если нужен Babel для транспиляции
      },
      
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
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