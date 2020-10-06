import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img, { FluidObject } from 'gatsby-image'
import Layout from '../components/layout'
import { ContentfulBlogPost, SiteSiteMetadata } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved
import heroStyles from '../components/hero.module.css'

const BlogPostTemplate: React.FC = (props) => {
  const post: ContentfulBlogPost = get(props, 'data.contentfulBlogPost')
  const siteTitle: SiteSiteMetadata = get(props, 'data.site.siteMetadata.title')

  return (
    <Layout>
      <div style={{ background: '#fff' }}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <div className={heroStyles.hero}>
          {post.heroImage?.fluid && post?.title ? (
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.heroImage.fluid as FluidObject}
            />
          ) : (
            ''
          )}
        </div>
        <div className="wrapper">
          <h1 className="section-headline">{post.title}</h1>
          <p
            style={{
              display: 'block',
            }}
          >
            {post.publishDate}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: post?.body?.childMarkdownRemark?.html || '',
            }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
