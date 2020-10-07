import * as React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Container from '@material-ui/core/Container'
import { Grid } from '@material-ui/core'
import Layout from '../components/layout'
import ProjectPreview from '../components/project-preview'
import { HomeQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved
import styles from './project.module.css'

const ProjectIndex: React.FC = (props) => {
  const site: HomeQueryQuery['site'] = get(props, 'data.site')
  const projects: HomeQueryQuery['allContentfulProject']['edges'] = get(
    props,
    'data.allContentfulProject.edges'
  )

  return (
    <Container disableGutters maxWidth="md">
      <Layout>
        <div style={{ background: '#fff' }}>
          <Helmet title={site?.siteMetadata?.title as string} />
          <div className={styles.hero}>Projects</div>
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

export default ProjectIndex

export const pageQuery = graphql`
  query ProjectIndexQuery {
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
  }
`
