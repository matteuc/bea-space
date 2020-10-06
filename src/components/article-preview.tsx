import * as React from 'react'
import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import styles from './article-preview.module.css'
import { BlogIndexQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved

type ArticlePreviewProps = {
  article: BlogIndexQueryQuery['allContentfulBlogPost']['edges'][0]['node']
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => (
  <div className={styles.preview}>
    <Img alt="" fluid={article?.heroImage?.fluid as FluidObject} />
    <h3 className={styles.previewTitle}>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>{article.publishDate}</small>
    <div
      dangerouslySetInnerHTML={{
        __html: article?.description?.childMarkdownRemark?.html || '',
      }}
    />
    {article.tags &&
      article.tags.map((tag) => (
        <p className={styles.tag} key={tag}>
          {tag}
        </p>
      ))}
  </div>
)

export default ArticlePreview
