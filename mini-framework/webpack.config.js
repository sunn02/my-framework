const path = require('path');

module.exports = {
  // Entrada de tu código
  entry: './src/index.js',  // El archivo que contiene tu framework

  // Salida del bundle generado
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',  // Archivo final generado
    library: 'miniFramework',  // Nombre de tu librería
    libraryTarget: 'umd',  // Permite la importación de la librería de diferentes maneras
    globalObject: 'this'  // Para compatibilidad con entornos como Node.js y browsers
  },

  // Configuración de Babel para que soporte JSX y ES6+
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },

  // Extensiones que Webpack resolverá automáticamente
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // Modo de desarrollo para hacer más fácil el debugging
  mode: 'development',
};
