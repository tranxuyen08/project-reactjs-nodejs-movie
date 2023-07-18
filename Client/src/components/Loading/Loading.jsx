import React from 'react'
import './Loading.css'
const LoadingComponent = () => {
  return (
    <div className='wrapper-loading'>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default LoadingComponent