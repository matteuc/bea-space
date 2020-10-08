import { makeStyles } from '@material-ui/core'
import * as React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}))

type RawHtmlProps = {
  html: string
}

const RawHtml: React.FC<RawHtmlProps> = ({ html }) => {
  const classes = useStyles()

  return (
    <div
      className={classes.root}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}

export default RawHtml
