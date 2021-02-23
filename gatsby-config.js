require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

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
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: 'rangesrc',
        accessToken: process.env.STOREFRONT_API_ACCESS_TOKEN,
        verbose: true
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
