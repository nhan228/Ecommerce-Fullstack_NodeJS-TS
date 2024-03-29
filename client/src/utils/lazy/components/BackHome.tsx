import React, { useEffect } from 'react'
import './loading.scss'

export default function BackHome() {
  useEffect(() => {
    window.location.href = '/'
  }, [])
  return (
    <>
      <div className="loader">
        <div className="loader-bg">
          <span>LOADING</span>
        </div>
        <div className="drops">
          <div className="drop1" />
          <div className="drop2" />
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="liquid"
            />
          </filter>
        </defs>
      </svg>
    </>
  )
}