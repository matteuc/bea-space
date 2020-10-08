import * as React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { Grid, Box } from '@material-ui/core'
import Layout from '../components/layout'
import ProjectPreview from '../components/project-preview'
import { HomeQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved
import Statement from '../components/statement'

const RootIndex: React.FC = (props) => {
  const siteTitle: HomeQueryQuery['contentfulSiteMetadata'] = get(
    props,
    'data.contentfulSiteMetadata.headerPageTitle'
  )
  const projects: HomeQueryQuery['allContentfulProject']['edges'] = get(
    props,
    'data.allContentfulProject.edges'
  )
  const layout: HomeQueryQuery['contentfulLandingLayout'] = get(
    props,
    'data.contentfulLandingLayout'
  )

  return (
    <Layout>
      <Helmet
        title={typeof siteTitle === 'string' ? siteTitle : 'My Portfolio'}
      />
      <Statement text={layout?.statement} />
      <Box mt={2}>
        <Grid container>
          {projects.map(({ node }) => {
            return (
              <Grid item xs={12} sm={6} key={node.slug}>
                <ProjectPreview project={node} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Layout>
  )
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    contentfulSiteMetadata(platform: { eq: "main" }) {
      headerPageTitle
    }
    contentfulLandingLayout(platform: { eq: "main" }) {
      statement
    }
    allContentfulProject(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          title
          slug
          preview {
            fluid(maxWidth: 350, maxHeight: 350, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
