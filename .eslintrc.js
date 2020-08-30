module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2020": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
  },
  "globals": {
    "$": "writeable",
    "mw": "writeable",
    "ssi_modal": "writeable",
    "InPageEdit": "writeable"
  }
};
