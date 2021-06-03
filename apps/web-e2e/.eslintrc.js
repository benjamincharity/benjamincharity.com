module.exports = {
  "extends": ["plugin:cypress/recommended", "../../.eslintrc.js"],
  "ignorePatterns": ["!**/*"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "parserOptions": {
        "project": "apps/web-e2e/tsconfig.*?.json"
      },
      "rules": {}
    },
    {
      "files": ["src/plugins/index.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off",
        "no-undef": "off"
      }
    }
  ]
}