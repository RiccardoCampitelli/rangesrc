module.exports = {
  siteMetadata: {
    title: 'Ranges RC',
    description: 'Ranges RC ecommerce website',
    keywords: 'gatsbyjs, gatsby, javascript, sample, something',
    siteUrl: 'https://www.google.com/',
    author: {
      name: 'Riccardo Campitelli',
      url: '',
      email: 'riccardo.campitelli91@gmail.com'
    }
  },
  plugins: [
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'content',
    //     path: `${__dirname}/src/content`
    //   }
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    // {
    //   resolve: 'gatsby-transformer-remark',
    //   options: {
    //     plugins: [
    //       {
    //         resolve: 'gatsby-remark-responsive-iframe',
    //         options: {
    //           wrapperStyle: 'margin-bottom: 1rem'
    //         }
    //       },
    //       'gatsby-remark-prismjs',
    //       'gatsby-remark-copy-linked-files',
    //       'gatsby-remark-smartypants',
    //       {
    //         resolve: 'gatsby-remark-images',
    //         options: {
    //           maxWidth: 1140,
    //           quality: 90,
    //           linkImagesToOriginal: false
    //         }
    //       }
    //     ]
    //   }
    // },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.google.com/'
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Passion One`],
        display: 'swap'
      }
    },
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-root-import'
  ]
}
