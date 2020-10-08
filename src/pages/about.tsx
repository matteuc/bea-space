import * as React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { Box, Grid, makeStyles } from '@material-ui/core'
import Img, { FluidObject } from 'gatsby-image'
import Layout from '../components/layout'
import { AboutIndexQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved
import Statement from '../components/statement'
import RawHtml from '../components/raw-html'

const useStyles = makeStyles((theme) => ({
  biography: {
    '&:not(a)': {
      color: theme.palette.grey[500],
    },
  },
}))

const AboutIndex: React.FC = (props) => {
  const siteTitle: AboutIndexQueryQuery['contentfulSiteMetadata'] = get(
    props,
    'data.contentfulSiteMetadata.headerPageTitle'
  )
  const layout: AboutIndexQueryQuery['contentfulAboutLayout'] = get(
    props,
    'data.contentfulAboutLayout'
  )

  const classes = useStyles()
  return (
    <Layout>
      <Helmet title={`About — ${siteTitle}`} />
      <Statement text={layout?.statement} />
      <Box mt={2}>
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={5}>
            <Box p={2}>
              <Img alt="" fluid={layout?.profilePhoto?.fluid as FluidObject} />
            </Box>
          </Grid>

          <Grid item md={7}>
            <Box p={2} className={classes.biography}>
              <RawHtml
                html={layout?.biography?.childMarkdownRemark?.html || ''}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default AboutIndex

export const pageQuery = graphql`
  query AboutIndexQuery {
    contentfulSiteMetadata(platform: { eq: "main" }) {
      headerPageTitle
    }
    contentfulAboutLayout(platform: { eq: "main" }) {
      statement
      profilePhoto {
        fluid(maxWidth: 350, resizingBehavior: SCALE) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      biography {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
