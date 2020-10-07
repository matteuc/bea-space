import * as React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Container from '@material-ui/core/Container'
import { Grid } from '@material-ui/core'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ProjectPreview from '../components/project-preview'
import { HomeQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved

const RootIndex: React.FC = (props) => {
  const site: HomeQueryQuery['site'] = get(props, 'data.site')
  const projects: HomeQueryQuery['allContentfulProject']['edges'] = get(
    props,
    'data.allContentfulProject.edges'
  )
  const [author]: HomeQueryQuery['allContentfulPerson']['edges'] = get(
    props,
    'data.allContentfulPerson.edges'
  )
  return (
    <Container disableGutters maxWidth="md">
      <Layout>
        <div style={{ background: '#fff' }}>
          <Helmet title={site?.siteMetadata?.title as string} />
          <Hero data={author.node} />
          <div className="wrapper">
            <h2 className="section-headline">Recent projects</h2>
            <Grid container>
              {projects.map(({ node }) => {
                return (
                  <Grid item xs={12} sm={6} key={node.slug}>
                    <ProjectPreview project={node} />
                  </Grid>
                )
              })}
            </Grid>
          </div>
        </div>
      </Layout>
    </Container>
  )
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
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
