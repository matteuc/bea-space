import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff944c',
    },
    secondary: {
      main: '#94b3cf',
    },
    text: {
      primary: '#222222',
    },
    grey: {
      '300': '#b7b7ae',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fbf8f3',
    },
  },
  typography: {
    fontFamily: 'nunito',
  },
})

export type Theme = typeof theme

export default theme
