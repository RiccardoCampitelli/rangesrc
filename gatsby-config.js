module.exports = {
  siteMetadata: {
    title: 'Ranges RC',
    description: 'Ranges RC ecommerce website',
    keywords: 'rangesrc, melbourne, music, rap',
    siteUrl: 'https://www.google.com/',
    author: {
      name: 'Riccardo Campitelli',
      url: 'https://github.com/RiccardoCampitelli',
      email: 'riccardo.campitelli91@gmail.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'albums',
        path: `${__dirname}/src/albumCovers`
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://rangesrc.netlify.app/'
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Passion One`],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/images/favicon.png',

        // WebApp Manifest Configuration
        appName: null, // Inferred with your package.json
        appDescription: null,
        developerName: null,
        developerURL: null,
        dir: 'auto',
        lang: 'en-US',
        background: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          yandex: false,
          windows: false
        }
      }
    },
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-root-import',
    'gatsby-plugin-advanced-sitemap',
    'gatsby-plugin-robots-txt'
  ]
}
