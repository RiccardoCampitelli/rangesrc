require('dotenv').config({
  path: `.env`
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `RangersRC`,
        short_name: `RRC`,
        start_url: `/`,
        background_color: `#2b2b2b`,
        theme_color: `fdc830`,
        display: `standalone`,
        icon: 'src/images/favicon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT
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
