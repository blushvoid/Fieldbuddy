const base = [
  require("postcss-import"),
  require("tailwindcss"),
  require("autoprefixer"),
];

const plugins =
  process.env.NODE_ENV === "production"
    ? [...base, require("@fullhuman/postcss-purgecss")]
    : base;

module.exports = { plugins };
