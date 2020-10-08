import * as React from 'react'

type RawHtmlProps = {
  html: string
}

const RawHtml: React.FC<RawHtmlProps> = ({ html }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}

export default RawHtml
