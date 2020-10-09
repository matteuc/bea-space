import * as React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  link: {
    margin: '0 0.5rem',
    color: `${theme.palette.grey[400]} !important`,
    fontSize: '1.2rem',
    fontWeight: 600,
    '&:hover': {
      color: `${theme.palette.grey[700]} !important`,
      textDecoration: 'none !important',
    },
  },
}))

const ProjectLinks: React.FC = () => {
  const classes = useStyles()
  return (
    <StaticQuery
      query={graphql`
        query {
          allContentfulProject(filter: { node_locale: { eq: "en-US" } }) {
            edges {
              node {
                title
                slug
              }
            }
          }
        }
      `}
      render={(data) => {
        return (
          <Box className={classes.root}>
            <Link to="/" className={classes.link}>
              All
            </Link>
            {data.allContentfulProject.edges.map(({ node: project }) => (
              <Link
                key={`link-${project.slug}`}
                to={`/spotlight/${project.slug}`}
                className={classes.link}
              >
                {' '}
                {project.title}
              </Link>
            ))}
          </Box>
        )
      }}
    />
  )
}

export default ProjectLinks
