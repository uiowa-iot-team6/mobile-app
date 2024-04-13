import Constants from 'expo-constants';

// Safely access the configuration
const expoConfig = Constants.expoConfig || {};

console.log('packagerOpts:', expoConfig);

const api = expoConfig.hostUri.split(`:`).shift().concat(`:3002`)

console.log(api);

export { api };
