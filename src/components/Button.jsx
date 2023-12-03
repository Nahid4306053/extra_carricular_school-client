import React from 'react'

export default function Button({CustomCss , children , ...rest}) {
  return (
    <button {...rest} className={`btn  capitalize ${CustomCss}`}>{children}</button>
  )
}
