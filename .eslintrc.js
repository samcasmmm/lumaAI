module.exports = {
  extends: "airbnb",
  rules: {
    /* JSX */
    "react/prop-types": [
      1,
      {
        ignore: ["className", "children", "location", "params", "location*"],
      },
    ],
    "no-param-reassign": [
      0,
      {
        props: false,
      },
    ],
    "prefer-rest-params": 1,
    "arrow-body-style": 0,
    "prefer-template": 0,
    "react/prefer-stateless-function": 1,
    "react/jsx-no-bind": [
      0,
      {
        ignoreRefs: false,
        allowArrowFunctions: false,
        allowBind: true,
      },
    ],
  },
};
