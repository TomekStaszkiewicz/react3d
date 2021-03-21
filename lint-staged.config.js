module.exports = {
    "src/**/*.{js,ts}": [
        () => "eslint --cache --ignore-pattern .eslintignore"
      ],
      "src/**/*.ts": [
        () => "tsc -p tsconfig.json --noEmit"
      ]
}