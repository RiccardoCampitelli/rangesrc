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
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: 'ranges-rc',
        accessToken: process.env.STOREFRONT_API_ACCESS_TOKEN,
        verbose: true,
        shopifyQueries: {
          articles: `
            query GetArticles($first: Int!, $after: String) {
              articles(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    author {
                      bio
                      email
                      firstName
                      lastName
                      name
                    }
                    blog {
                      id
                    }
                    comments(first: 250) {
                      edges {
                        node {
                          author {
                            email
                            name
                          }
                          content
                          contentHtml
                          id
                        }
                      }
                    }
                    content
                    contentHtml
                    excerpt
                    excerptHtml
                    id
                    handle
                    image {
                      altText
                      id
                      src
                    }
                    publishedAt
                    tags
                    title
                    url
                    seo {
                      title
                      description
                    }
                  }
                }
              }
            }
          `,
          blogs: `
            query GetBlogs($first: Int!, $after: String) {
              blogs(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    id
                    handle
                    title
                    url
                  }
                }
              }
            }
          `,
          collections: `
            query GetCollections($first: Int!, $after: String) {
              collections(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    description
                    descriptionHtml
                    handle
                    id
                    image {
                      altText
                      id
                      src
                    }
                    products(first: 250) {
                      edges {
                        node {
                          id
                        }
                      }
                    }
                    title
                    updatedAt
                  }
                }
              }
            }
          `,
          products: `
            query GetProducts($first: Int!, $after: String) {
              products(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    availableForSale
                    createdAt
                    description
                    descriptionHtml
                    handle
                    id
                    images(first: 250) {
                      edges {
                        node {
                          id
                          altText
                          originalSrc
                        }
                      }
                    }
                    metafields(first: 250) {
                      edges {
                        node {
                          description
                          id
                          key
                          namespace
                          value
                          valueType
                        }
                      }
                    }
                    onlineStoreUrl
                    options {
                      id
                      name
                      values
                    }
                    priceRange {
                      minVariantPrice {
                        amount
                        currencyCode
                      }
                      maxVariantPrice {
                        amount
                        currencyCode
                      }
                    }
                    productType
                    publishedAt
                    tags
                    title
                    updatedAt
                    variants(first: 250) {
                      edges {
                        node {
                          availableForSale
                          compareAtPrice
                          compareAtPriceV2 {
                            amount
                            currencyCode
                          }
                          id
                          image {
                            altText
                            id
                            originalSrc
                          }
                          metafields(first: 250) {
                            edges {
                              node {
                                description
                                id
                                key
                                namespace
                                value
                                valueType
                              }
                            }
                          }
                          price
                          priceV2 {
                            amount
                            currencyCode
                          }
                          requiresShipping
                          selectedOptions {
                            name
                            value
                          }
                          sku
                          title
                          weight
                          weightUnit
                          presentmentPrices(first: 250) {
                            edges {
                              node {
                                price {
                                  amount
                                  currencyCode
                                }
                                compareAtPrice {
                                  amount
                                  currencyCode
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    vendor
                  }
                }
              }
            }
          `,
          shopPolicies: `
            query GetPolicies {
              shop {
                privacyPolicy {
                  body
                  id
                  title
                  url
                }
                refundPolicy {
                  body
                  id
                  title
                  url
                }
                termsOfService {
                  body
                  id
                  title
                  url
                }
              }
            }
          `,
          pages: `
            query GetPages($first: Int!, $after: String) {
              pages(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    id
                    handle
                    title
                    body
                    bodySummary
                    updatedAt
                    url
                  }
                }
              }
            }
          `
        }
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
