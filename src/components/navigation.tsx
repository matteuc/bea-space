import * as React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

const Navigation: React.FC = () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
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

export default Navigation
