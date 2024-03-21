/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config) {
    config.module.rules.push({ test: /\.md$/i, use: "raw-loader" });
    config.module.rules.push({ test: /\.ya?ml$/i, use: "raw-loader" });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/v3",
        permanent: false,
      },
      {
        source: "/v1",
        destination: "https://st-professional-hugo.netlify.app/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
// const withYAML = require("next-yaml");
// module.exports = withYAML(nextConfig);
