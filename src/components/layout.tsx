import * as React from 'react'
import { Container, ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import 'fontsource-nunito'
import Navigation from './navigation'
import theme from '../theme'
import './base.css'

const useStyles = makeStyles({
  root: {
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.background.default,
  },
})

const Template: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth="md" className={classes.root}>
        <Navigation />
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default Template
