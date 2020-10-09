import * as React from 'react'

type LocationContextProps = {
  path: string
}

const initialLocationContext = {
  path: '/',
}

const LocationContext = React.createContext<LocationContextProps>(
  initialLocationContext
)

function useLocation(): LocationContextProps {
  const context = React.useContext(LocationContext)
  if (context === undefined) {
    throw new Error(`useLocation must be used within a LocationProvider`)
  }
  return context
}

export { LocationContext, useLocation }
