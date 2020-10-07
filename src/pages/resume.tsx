import * as React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { Grid } from '@material-ui/core'
import Layout from '../components/layout'
import ProjectPreview from '../components/project-preview'
import { ResumeIndexQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved
import Statement from '../components/statement'

const ResumeIndex: React.FC = (props) => {
  const site: ResumeIndexQueryQuery['site'] = get(props, 'data.site')
  const projects: ResumeIndexQueryQuery['allContentfulProject']['edges'] = get(
    props,
    'data.allContentfulProject.edges'
  )
  const layout: ResumeIndexQueryQuery['contentfulResumeLayout'] = get(
    props,
    'data.contentfulResumeLayout'
  )

  return (
    <Layout>
      <Helmet title={site?.siteMetadata?.title as string} />
      <Statement text={layout?.statement} />
      <div className="wrapper">
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
    </Layout>
  )
}

export default ResumeIndex

export const pageQuery = graphql`
  query ResumeIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulResumeLayout(platform: { eq: "main" }) {
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
  }
`
