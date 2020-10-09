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
  ContentfulProjectHighlight,
} from '../../types/graphql-types' // eslint-disable-line import/no-unresolved
import RawHtml from '../components/raw-html'
import ProjectLinks from '../components/project-links'

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
  highlight: {
    margin: '0.5rem 0',
    display: 'flex',
    textAlign: 'center',
  },
  highlightContainer: {
    margin: 'auto',
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

  const generateProjectPhoto = (
    photo: ContentfulProjectPhoto,
    index: number
  ) => (
    <Grid
      key={`project-photo-${index}`}
      item
      xs={12}
      sm={photo.fullWidth ? 10 : 6}
      md={photo.fullWidth ? 7 : 5}
    >
      <Img alt={photo.name} fluid={photo.image?.fluid as FluidObject} />
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

  const generateProjectHighlight = (
    highlight: ContentfulProjectHighlight,
    index: number
  ) => (
    <Grid key={`project-photo-${index}`} item xs={12}>
      <Box className={classes.highlight}>
        <Box className={classes.highlightContainer}>
          <RawHtml html={highlight.text.childContentfulRichText.html} />
        </Box>
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
            {project?.projectContent?.map((content, idx) => {
              switch (content.__typename) {
                case 'ContentfulProjectPhoto':
                  return generateProjectPhoto(content, idx)
                case 'ContentfulProjectHighlight':
                  return generateProjectHighlight(content, idx)
                default:
                  return <></>
              }
            })}
          </Grid>
          <Box mt={5} mb={5}>
            <ProjectLinks />
          </Box>
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
          name
          image {
            fluid(maxWidth: 1180, background: "rgb:000000") {
              ...GatsbyContentfulFluid
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
