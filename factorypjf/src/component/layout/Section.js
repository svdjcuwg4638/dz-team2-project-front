import React from 'react'

const Section = ({children,idx}) => {
  return (
    <div className='section_style' style={{display : idx == 1 ? "bock" : "none"}}>
      {children}
    </div>
  )
}

export default Section