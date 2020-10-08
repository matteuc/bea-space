import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

const useStyles = makeStyles({
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    height: '20vh',
    maxHeight: '100px',
    fontSize: '1.25em',
  },
})

const Navigation: React.FC = () => {
  const classes = useStyles()

  return (
    <nav role="navigation">
      <ul className={classes.navigation}>
        <li className={styles.navigationItem}>
          <Link to="/">Work</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/about">About</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/contact">Contact</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/resume">Resume</Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navigation
