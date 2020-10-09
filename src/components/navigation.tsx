import * as React from 'react'
import { Box, Hidden, IconButton, makeStyles } from '@material-ui/core'
import { graphql, Link, StaticQuery } from 'gatsby'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    padding: 0,
    marginBottom: '15vh',
    maxHeight: '100px',
    fontSize: '1em',
  },
  activeLink: {
    color: `${theme.palette.text.secondary} !important`,
  },
  linkSection: {
    display: 'flex',
  },
  linkContainer: {
    margin: '0 1em',
    '& a:hover': {
      textDecoration: 'none !important',
      color: `${theme.palette.grey[500]} !important`,
    },
  },
  modalLinkContainer: {
    margin: '2rem 0',
    fontWeight: 600,
    fontSize: '1.5rem',
    '& a:hover': {
      textDecoration: 'none !important',
      color: `${theme.palette.grey[500]} !important`,
    },
    textAlign: 'center',
  },
  siteTitle: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  },
  navigationMobile: {
    display: 'flex',
    position: 'relative',
  },
  siteTitleMobile: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  menuToggle: {
    right: '0',
  },
  modal: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: 0,
    opacity: 0,
    display: 'flex',
    transition: `opacity ${theme.transitions.duration.enteringScreen}ms`,
  },
  modalMenu: {
    margin: 'auto',
  },
  modalOpen: {
    opacity: 1,
    zIndex: 2,
  },
}))

type SitePage = {
  label: string
  route: string
}

const sitePages: Array<SitePage> = [
  {
    label: 'Work',
    route: '/',
  },
  {
    label: 'About',
    route: '/about',
  },
  {
    label: 'Contact',
    route: '/contact',
  },
  {
    label: 'Resume',
    route: '/resume',
  },
]

const MenuToggle: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const classes = useStyles()

  const styleActive = (path: string) => {
    let matchPath = window.location.pathname

    if (matchPath.startsWith('/spotlight')) matchPath = '/'

    return path === matchPath ? classes.activeLink : ''
  }

  return (
    <>
      <Box
        onClick={() => setOpen(false)}
        className={`${classes.modal} ${open ? classes.modalOpen : ''}`}
      >
        <Box className={classes.modalMenu}>
          {sitePages.map(({ label, route }) => (
            <Box
              key={`modal-link-${route}`}
              textAlign="center"
              className={classes.modalLinkContainer}
            >
              <Link className={styleActive(route)} to={route}>
                {label}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

const Navigation: React.FC = () => {
  const classes = useStyles()

  const styleActive = (path: string) => {
    let matchPath = window.location.pathname

    if (matchPath.startsWith('/spotlight')) matchPath = '/'

    return path === matchPath ? classes.activeLink : ''
  }

  const generateNavLink = ({ route, label }: SitePage) => (
    <li key={`nav-link-${route}`} className={classes.linkContainer}>
      <Link className={styleActive(route)} to={route}>
        {label}
      </Link>
    </li>
  )

  return (
    <StaticQuery
      query={graphql`
        query {
          contentfulSiteMetadata(platform: { eq: "main" }) {
            headerTitle
          }
        }
      `}
      render={(data) => {
        return (
          <>
            <Hidden only={['xs', 'sm']}>
              <nav role="navigation">
                <ul className={classes.navigation}>
                  <span className={classes.linkSection}>
                    {sitePages
                      .slice(0, Math.floor(sitePages.length / 2))
                      .map((sitePage) => generateNavLink(sitePage))}
                  </span>
                  <h3 className={classes.siteTitle}>
                    {data.contentfulSiteMetadata.headerTitle}
                  </h3>
                  <span className={classes.linkSection}>
                    {sitePages
                      .slice(Math.floor(sitePages.length / 2), sitePages.length)
                      .map((sitePage) => generateNavLink(sitePage))}
                  </span>
                </ul>
              </nav>
            </Hidden>
            <Hidden only={['md', 'lg', 'xl']}>
              <nav role="navigation">
                <ul className={classes.navigationMobile}>
                  <h3 className={classes.siteTitleMobile}>
                    {data.contentfulSiteMetadata.headerTitle}
                  </h3>
                  <span className={classes.menuToggle}>
                    <MenuToggle />
                  </span>
                </ul>
              </nav>
            </Hidden>
          </>
        )
      }}
    />
  )
}
export default Navigation
