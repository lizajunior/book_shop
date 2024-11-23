const path = require('path');

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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Имя для итогового CSS-файла
    }),
  ],
  mode: 'development', // Для production используйте 'production'
};