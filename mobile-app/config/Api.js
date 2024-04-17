import Constants from "expo-constants";

// Safely access the configuration
const expoConfig = Constants.expoConfig || {};

console.log("packagerOpts:", expoConfig);

const api = process.env.EXPO_PUBLIC_API_URL
  ? process.env.EXPO_PUBLIC_API_URL.replace(/\/$/, "")
  : expoConfig.hostUri
      .split(`:`)
      .shift()
      .concat(
        `:${process.env.EXPO_PUBLIC_DEV_API_PORT}/${process.env.EXPO_PUBLIC_DEV_API_BASE_PATH.replace(/\/$/, "")}`,
      );

console.log(`API URL set to: '${api}'`);

export { api };
