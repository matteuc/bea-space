import * as React from 'react'
import Img, { FluidObject } from 'gatsby-image'

import styles from './hero.module.css'
import { HomeQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved

type HeroProps = {
  data: HomeQueryQuery['allContentfulPerson']['edges'][0]['node']
}

const Hero: React.FC<HeroProps> = ({ data }) => (
  <div className={styles.hero}>
    <Img
      className={styles.heroImage}
      alt={data?.name || ''}
      fluid={data?.heroImage?.fluid as FluidObject}
    />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{data.name}</h3>
      <p className={styles.heroTitle}>{data.title}</p>
      <p>{data?.shortBio?.shortBio}</p>
    </div>
  </div>
)

export default Hero
