import * as React from 'react'
import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import styles from './project-preview.module.css'
import { ProjectIndexQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved

type ProjectPreviewProps = {
  project: ProjectIndexQueryQuery['allContentfulProject']['edges'][0]['node']
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => (
  <div className={styles.preview}>
    <Img alt="" fluid={project?.preview?.fluid as FluidObject} />
    <h3 className={styles.previewTitle}>
      <Link to={`/spotlight/${project.slug}`}>{project.title}</Link>
    </h3>
    {/* <small>{project.publishDate}</small> */}
    <div
      dangerouslySetInnerHTML={{
        __html: project?.description?.childMarkdownRemark?.html || '',
      }}
    />
    {/* {project.tags &&
      project.tags.map((tag) => (
        <p className={styles.tag} key={tag}>
          {tag}
        </p>
      ))} */}
  </div>
)

export default ProjectPreview
