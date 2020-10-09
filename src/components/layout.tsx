import * as React from 'react'
import {
  Container,
  ThemeProvider,
  Box,
  createMuiTheme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { graphql, StaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import 'fontsource-nunito'
import Navigation from './navigation'
import theme from '../theme'
import '../base.css'

const useStyles = makeStyles({
  root: {
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  main: {
    padding: 40,
    [theme.breakpoints.down('xs')]: {
      padding: 20,
    },
  },
})

const Template: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <base target="_blank" />
      <StaticQuery
        query={graphql`
          query {
            contentfulSiteMetadata(platform: { eq: "main" }) {
              headerTitle
              appIcon {
                fixed(width: 100, height: 100) {
                  ...GatsbyContentfulFixed
                }
              }
            }
            contentfulSiteTheme(platform: { eq: "main" }) {
              primary
              secondary
              background
            }
          }
        `}
        render={(data) => {
          const appTheme = createMuiTheme({
            palette: {
              primary: {
                main: data.contentfulSiteTheme.primary,
              },
              secondary: {
                main: data.contentfulSiteTheme.secondary,
              },
              text: {
                primary: '#222222',
              },
              grey: {
                '300': '#b7b7ae',
              },
              background: {
                default: data.contentfulSiteTheme.background,
              },
            },
            typography: {
              fontFamily: 'nunito',
            },
          })

          return (
            <ThemeProvider theme={appTheme}>
              <Helmet
                link={[
                  {
                    rel: 'icon',
                    type: 'image/png',
                    href: data.contentfulSiteMetadata.appIcon.fixed.src,
                  },
                ]}
              />
              <Container
                disableGutters
                className={classes.root}
                maxWidth={false}
              >
                <Container
                  disableGutters
                  className={classes.root}
                  maxWidth="md"
                >
                  <Box className={classes.main}>
                    <Navigation
                      title={data.contentfulSiteMetadata.headerTitle}
                    />
                    {children}
                  </Box>
                </Container>
              </Container>
            </ThemeProvider>
          )
        }}
      />
    </>
  )
}

export default Template
