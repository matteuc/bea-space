import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img, { FluidObject } from 'gatsby-image'
import { Box, Typography, makeStyles, Grid, Container } from '@material-ui/core'
import Layout from '../components/layout'
import {
  ProjectBySlugQuery,
  ContentfulProjectPhoto,
} from '../../types/graphql-types' // eslint-disable-line import/no-unresolved
import RawHtml from '../components/rawHtml'

const useStyles = makeStyles({
  title: {
    fontWeight: 600,
  },
  description: {
    lineHeight: '2rem',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
  caption: {
    margin: '0.5rem 0',
    display: 'flex',
    textAlign: 'center',
  },
  captionContainer: {
    margin: 'auto',
    fontSize: '1rem',
  },
})

const ProjectTemplate: React.FC = (props) => {
  const project: ProjectBySlugQuery['contentfulProject'] = get(
    props,
    'data.contentfulProject'
  )
  const siteTitle: ProjectBySlugQuery['contentfulSiteMetadata'] = get(
    props,
    'data.contentfulSiteMetadata.headerPageTitle'
  )
  const classes = useStyles()

  const generateProjectPhoto = (photo: ContentfulProjectPhoto) => (
    <Grid item xs={12} sm={photo.fullWidth ? 12 : 6}>
      <Img alt="" fluid={photo.image?.fluid as FluidObject} />
      <Box className={classes.caption}>
        {photo.caption ? (
          <Box className={classes.captionContainer}>
            <RawHtml html={photo.caption.childContentfulRichText.html} />
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Grid>
  )

  return (
    <Layout>
      <Box>
        <Helmet title={`${project.title} | ${siteTitle}`} />
        <Box mt={5} mb={5}>
          <Typography className={classes.title} align="center" variant="h4">
            {project?.title}
          </Typography>
        </Box>
        <Container maxWidth="md">
          <Grid container justify="center" spacing={5}>
            <Grid item xs={12} md={8}>
              <Box className={classes.description}>
                <RawHtml
                  html={project?.description?.childMarkdownRemark?.html}
                />
              </Box>
            </Grid>
            {project?.projectContent?.map((content) => {
              switch (content.__typename) {
                case 'ContentfulProjectPhoto':
                  return generateProjectPhoto(content)
                // case 'ContentfulProjectHighlight':
                //   return generateProjectHighlight(content)
                //   break
                default:
                  return <></>
              }
            })}
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export default ProjectTemplate

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    contentfulSiteMetadata(platform: { eq: "main" }) {
      headerPageTitle
    }
    contentfulProject(slug: { eq: $slug }) {
      title
      preview {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      projectContent {
        ... on ContentfulProjectHighlight {
          __typename
          text {
            childContentfulRichText {
              html
            }
          }
        }
        ... on ContentfulProjectPhoto {
          __typename
          image {
            fluid(maxWidth: 1180, background: "rgb:000000") {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          fullWidth
          caption {
            childContentfulRichText {
              html
            }
          }
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
