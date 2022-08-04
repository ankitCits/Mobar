module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".tsx", ".ts", ".js", ".json",".cjs",".graphql"],
      },
    ],
    "react-native-reanimated/plugin",
  ],
};