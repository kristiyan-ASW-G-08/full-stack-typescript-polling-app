/* eslint-disable global-require */
module.exports = {
  plugins:

       [
          require("tailwindcss"),
          require("autoprefixer"),
          require("postcss-preset-env"),
          require("@fullhuman/postcss-purgecss")({
            content: ["./src/*.tsx"],
            defaultExtractor: content =>
              content.match(/[a-zA-Z0-9-_:/]+/g) || []
          }),
          require("cssnano")
        ]
      }
