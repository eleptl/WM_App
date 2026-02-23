/*module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};*/

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Questo plugin deve essere SEMPRE l'ultimo della lista
      'react-native-reanimated/plugin',
    ],
  };
};
/*
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxRuntime: 'automatic' }]
    ],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};*/

