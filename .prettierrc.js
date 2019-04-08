module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: false,
  overrides: [
    {
      files: "*.tsx, *.ts",
      options: {
        parser: "typescript"
      }
    }
  ]
}

