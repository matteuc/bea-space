import { makeStyles, Typography } from '@material-ui/core'
import * as React from 'react'

const useStyles = makeStyles({
  statement: {
    width: '80%',
    margin: 'auto',
    fontWeight: 600,
    lineHeight: '4rem',
  },
  statementContainer: {
    display: 'flex',
    padding: '3rem 0',
  },
})

type StatementProps = {
  text?: string | null | undefined
}

const Statement: React.FC<StatementProps> = ({ text = 'Statement' }) => {
  const classes = useStyles()

  return (
    <div className={classes.statementContainer}>
      <Typography
        color="primary"
        align="center"
        className={classes.statement}
        variant="h3"
      >
        {text}
      </Typography>
    </div>
  )
}

export default Statement
