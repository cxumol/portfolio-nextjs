/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config) {
    config.module.rules.push({ test: /\.md$/i, use: "raw-loader" });
    config.module.rules.push({ test: /\.ya?ml$/i, use: "raw-loader" });
    return config;
  },
};

module.exports = nextConfig;
// const withYAML = require("next-yaml");
// module.exports = withYAML(nextConfig);
