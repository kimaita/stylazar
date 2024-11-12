const plugins = [
  [
    "babel-plugin-import",
    {
      libraryName: "@mui/material",
      libraryDirectory: "",
      camel2DashComponentName: false,
    },
    "core",
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@mui/icons-material",
      libraryDirectory: "",
      camel2DashComponentName: false,
    },
    "icons",
  ],
  [
    {
      "presets": ["@babel/preset-env", "react-app"],
      "plugins": ["@babel/plugin-proposal-private-property-in-object"]
    }
  ]
];

module.exports = { plugins };
