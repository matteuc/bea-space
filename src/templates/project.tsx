import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img, { FluidObject } from 'gatsby-image'
import Layout from '../components/layout'
import { ContentfulProject, SiteSiteMetadata } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved
import heroStyles from '../components/hero.module.css'

const ProjectTemplate: React.FC = (props) => {
  const post: ContentfulProject = get(props, 'data.contentfulProject')
  const siteTitle: SiteSiteMetadata = get(props, 'data.site.siteMetadata.title')

  return (
    <Layout>
      <div style={{ background: '#fff' }}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <div className={heroStyles.hero}>
          {post.preview?.fluid && post?.title ? (
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.preview.fluid as FluidObject}
            />
          ) : (
            ''
          )}
        </div>
        <div className="wrapper">
          <h1 className="section-headline">{post.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: post?.description?.childMarkdownRemark?.html || '',
            }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default ProjectTemplate

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulProject(slug: { eq: $slug }) {
      title
      preview {
        fluid(maxWidth: 1180, background: "rgb:000000") {
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
`
