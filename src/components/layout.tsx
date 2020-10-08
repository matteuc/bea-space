import * as React from 'react'
import { Container, ThemeProvider, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
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
})

const Template: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <base target="_blank" />
      <ThemeProvider theme={theme}>
        <Container disableGutters className={classes.root} maxWidth={false}>
          <Container disableGutters className={classes.root} maxWidth="md">
            <Box p={5}>
              <Navigation />
              {children}
            </Box>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Template
