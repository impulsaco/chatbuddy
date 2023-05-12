/*module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": false,
      "allowUndefined": true
    }]
  ]
}; */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            "@app": "./App",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};

/* module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], 
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "react-native-dotenv",
          path: ".env",
          allowUndefined: true
        },
      ],
      'react-native-reanimated/plugin',
    ]
  };
}; */
