import * as React from 'react'
import { Container, ThemeProvider, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import 'fontsource-nunito'
import Navigation from './navigation'
import theme from '../theme'
import './base.css'

const useStyles = makeStyles({
  root: {
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  },
})

const Template: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters className={classes.root}>
        <Box p={2}>
          <Navigation />
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Template
