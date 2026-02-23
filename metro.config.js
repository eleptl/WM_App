/*const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Questo pezzo dice a Expo dove trovare il modulo mancante
config.resolver.extraNodeModules = {
  'react-native-worklets': require('path').resolve(__dirname, 'node_modules/react-native-worklets-core'),
};

module.exports = config;*/

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Forza Metro a usare la cartella -core quando qualcuno chiede quella senza -core
config.resolver.extraNodeModules = {
    'react-native-worklets': path.resolve(__dirname, 'node_modules/react-native-worklets-core'),
};

module.exports = config;