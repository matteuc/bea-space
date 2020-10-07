import * as React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import styles from './project.module.css'
import Layout from '../components/layout'
import ProjectPreview from '../components/project-preview'
import {
  ProjectIndexQueryQuery,
  SiteSiteMetadata,
} from '../../types/graphql-types' // eslint-disable-line import/no-unresolved

const ProjectIndex: React.FC = (props) => {
  const siteMeta: SiteSiteMetadata = get(props, 'data.site.siteMetadata')
  const posts: ProjectIndexQueryQuery['allContentfulProject']['edges'] = get(
    props,
    'data.allContentfulProject.edges'
  )

  return (
    <Layout>
      <div style={{ background: '#fff' }}>
        <Helmet title={siteMeta.title as string} />
        <div className={styles.hero}>Project</div>
        <div className="wrapper">
          <h2 className="section-headline">Recent projects</h2>
          <ul className="project-list">
            {posts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ProjectPreview project={node} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Layout>
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
    allContentfulProject(
      sort: { fields: [title], order: DESC }
      filter: { node_locale: { eq: "en-US" } }
    ) {
      edges {
        node {
          title
          slug
          preview {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
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
