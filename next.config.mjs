/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cryptologos.cc"] // TODO: probably set domain for own CDN
  },
  webpack(config) {
    // Add the @svgr/webpack loader for SVGs
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false
          }
        }
      ]
    });

    // Add specific modules to externals
    config.externals = config.externals || [];
    config.externals.push(
      "encoding" /* add any other modules that might be causing the error */
    );

    return config;
  }
};

export default nextConfig;
