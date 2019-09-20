module.exports = {
  pathPrefix: `/2019-local-administrative-budget-and-projects`,
  siteMetadata: {
    title: `ขุมทรัพย์ 7 แสนล้าน และรอยรั่วงบประมาณท้องถิ่น!?`,
    description: `บทวิเคราะห์รูปแบบการใช้จ่ายงบประมาณขององค์การปกครองส่วนทั้งถิ่น`,
    author: `ชนิกานต์ กาญจนสาลี, กิตตินันท์ นาคทอง, กนิษฐา ไชยแสง, อักษราภัค พุทธวงษ์, ไวยณ์วุฒิ เอื้อจงประสิทธิ์, ภัทรวัต ช่อไม้`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `kanit`,
          `athiti`
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-48736618-10",
      },
    },
  ],
}
