/* eslint-disable global-require */
module.exports = {
  plugins:
    process.env.NODE_ENV === "production"
      ? [
          require("tailwindcss"),
          require("autoprefixer"),
          require("postcss-preset-env"),
          require("@fullhuman/postcss-purgecss")({
            content: ["./pages/*.tsx", "./components/*.tsx"],
            defaultExtractor: content =>
              content.match(/[a-zA-Z0-9-_:/]+/g) || []
          }),
          require("cssnano")
        ]
      : [
          require("tailwindcss"),
          require("postcss-preset-env"),
          require("autoprefixer")
        ]
};
