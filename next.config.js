const path = require('path')
const withLess = require('next-with-less')
const withImages = require('next-images')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.ANALYZE
})

const env = {
  APP_BE: process.env.APP_BE,
  APP_FE: process.env.APP_FE,
  APP_GOOGLE_BASE: process.env.APP_GOOGLE_BASE,
  APP_CLIENT_ID: process.env.APP_CLIENT_ID,
  APP_CHAT: process.env.APP_CHAT
}

const sassConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/sass')]
  }
}

const lessConfig = {
  lessLoaderOptions: {}
}

const purgeCssConfig = {
  purgeCssPaths: ['src/**/*', 'public/**/*', 'pages/**/*'],
  purgeCss: {
    whitelistPatterns: [/^ant/, /^::-webkit-scrollbar/, /^#nprogress/, /^#__next/, /^body/],
    whitelistPatternsChildren: [/^ant/, /^::-webkit-scrollbar/, /^#nprogress/, /^#__next/, /^body/]
  }
}

const webpack = (config, _options) => {
  config.module.rules.push({
    test: /\.html$/i,
    use: 'raw-loader'
  })
  config.module.rules.push({
    test: /\.svg$/,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          removeViewBox: false
        }
      }
    ],
    exclude: /(\/fonts)/
  })
  config.module.rules.push({
    test: /src\/common\/(antd|components|helpers|hocs|hooks|security)\/index.tsx/i,
    sideEffects: false
  })

  return config
}
const images = {
  disableStaticImages: true,
  domains: ['https://lh3.googleusercontent.com']
}
const removeImports = require('next-remove-imports')({
  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  matchImports: '\\.(less|css|scss|sass|styl)$'
})

const settings = {
  reactStrictMode: false,
  swcMinify: true,
  assetPrefix: ['production', 'staging'].includes(env.ENVIRONMENT) ? `${env.APP_FE}/${env.ENVIRONMENT}` : '',
  productionBrowserSourceMaps: ['staging'].includes(env.ENVIRONMENT),
  env,

  ...sassConfig,
  ...lessConfig,
  ...purgeCssConfig,
  ...images,
  ...webpack,
  typescipt: { ignoreBuildErrors: true },
  eslint: {
    ignoreDuringBuilds: true
  },
  async rewrites() {
    return env.APP_BE === env.APP_FE
      ? []
      : [
          {
            source: '/api/v1/:path*',
            destination: `${env.APP_BE}/api/v1/:path*` // Proxy to Backend
          }
        ]
  }
}

module.exports = removeImports(withBundleAnalyzer(withImages(withLess(settings))))
