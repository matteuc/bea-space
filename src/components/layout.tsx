import * as React from 'react'
import Container from './container'
import Navigation from './navigation'
import './base.css'

const Template: React.FC = ({ children }) => {
  return (
    <Container>
      <Navigation />
      {children}
    </Container>
  )
}

export default Template
