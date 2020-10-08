import * as React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import Layout from '../components/layout'
import { ResumeIndexQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved
import Statement from '../components/statement'

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 600,
  },
  experienceDetails: {
    lineHeight: '2rem',
    listStyle: 'none',
    color: theme.palette.text.secondary,
    '& li': {
      margin: '0.5rem 0',
    },
    '& li::before': {
      content: '"•"',
      color: theme.palette.text.secondary,
      display: 'inline-flex',
      width: '1em',
      marginLeft: '-1em',
    },
  },
  subtitle: {
    padding: '1rem 0',
    color: theme.palette.text.secondary,
  },
  divider: {
    margin: '1rem 0',
    width: '100%',
  },
}))

const ResumeIndex: React.FC = (props) => {
  const siteTitle: ResumeIndexQueryQuery['contentfulSiteMetadata'] = get(
    props,
    'data.contentfulSiteMetadata.headerPageTitle'
  )

  const layout: ResumeIndexQueryQuery['contentfulResumeLayout'] = get(
    props,
    'data.contentfulResumeLayout'
  )

  const classes = useStyles()

  return (
    <Layout>
      <Helmet
        title={`Resume — ${
          typeof siteTitle === 'string' ? siteTitle : 'My Portfolio'
        }`}
      />
      <Statement text={layout?.statement} />
      <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {layout?.resume?.file?.url ? (
              <a href={layout.resume.file.url} download target="__blank">
                <Typography align="left" variant="h5" color="primary">
                  Click here to download my resume!
                </Typography>
              </a>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={12}>
            <Box fontStyle="italic">
              <Typography align="left" variant="h5">
                Professional Experience.
              </Typography>
            </Box>
          </Grid>

          {layout?.experiences?.map(
            ({
              companyName,
              startDate,
              endDate,
              positionTitle,
              experienceDetails,
            }) => (
              <React.Fragment key={`${companyName}-${positionTitle}`}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography
                      align="left"
                      variant="h4"
                      className={classes.heading}
                    >
                      {companyName}
                    </Typography>
                  </Box>
                  <Typography
                    align="left"
                    variant="subtitle1"
                    className={classes.subtitle}
                  >
                    {startDate} — {endDate}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    align="left"
                    variant="h5"
                    className={classes.heading}
                  >
                    {positionTitle}
                  </Typography>
                  <Box mt={1}>
                    <ul className={classes.experienceDetails}>
                      {experienceDetails.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </Box>
                </Grid>

                <Divider className={classes.divider} />
              </React.Fragment>
            )
          )}

          <Grid item xs={12}>
            <Box fontStyle="italic">
              <Typography align="left" variant="h5">
                Technical Skills.
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography color="textSecondary" align="left">
                {layout?.skills?.join(', ')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default ResumeIndex

export const pageQuery = graphql`
  query ResumeIndexQuery {
    contentfulSiteMetadata(platform: { eq: "main" }) {
      headerPageTitle
    }
    contentfulResumeLayout(platform: { eq: "main" }) {
      statement
      experiences {
        ... on ContentfulResumeLayoutExperience {
          companyName
          positionTitle
          startDate
          endDate
          experienceDetails
        }
      }
      resume {
        file {
          url
        }
      }
      skills
    }
  }
`
