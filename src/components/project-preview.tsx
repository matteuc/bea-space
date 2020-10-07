import * as React from 'react'
import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Box, Paper } from '@material-ui/core'
import styles from './project-preview.module.css'
import { ProjectIndexQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved

type ProjectPreviewProps = {
  project: ProjectIndexQueryQuery['allContentfulProject']['edges'][0]['node']
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => (
  <>
    <Box p={2}>
      <Link to={`/spotlight/${project.slug}`}>
        <Paper elevation={5} className={styles.projectPreview}>
          <Img alt="" fluid={project?.preview?.fluid as FluidObject} />
        </Paper>
      </Link>
    </Box>
  </>
)

export default ProjectPreview
