import * as React from 'react'
import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import { Box, Paper } from '@material-ui/core'
import { HomeQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved

type ProjectPreviewProps = {
  project: HomeQueryQuery['allContentfulProject']['edges'][0]['node']
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  return (
    <>
      <Box p={2}>
        <Link to={`/spotlight/${project.slug}`}>
          <Paper elevation={5}>
            <Img
              alt={project?.title}
              fluid={project?.preview?.fluid as FluidObject}
            />
          </Paper>
        </Link>
      </Box>
    </>
  )
}

export default ProjectPreview
