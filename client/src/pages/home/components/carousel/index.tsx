import React, { useState, useEffect } from 'react'
import './carousel.scss'
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [timer, setTimer] = useState(null)

  const images = [
    'https://lh3.googleusercontent.com/NQJCEeIT3FEf7UepEzQb0k83I6Je5BDOlTWsMhiaeX4xNOFOo7Fm1cOE3QX7UpPLA6PI4hzlL8NB3rV6MleLS0ZiKLL0rAoWnQ=rw-w1920',
    'https://lh3.googleusercontent.com/b-UG7x-ul6-a6xTTeSm2z2awWNRi7v6MuJ0fr3XJge2MpzZ-hycQYv2XZVoDL-oV7R2bQ33mVweZeI2kO9hPvDTxsPaoHcKN=rw-w1921',
    'https://lh3.googleusercontent.com/TX-oA8rwdssHliAZyuh4549I1qqqzcaUse7RCO38s13hHtFv5c4MFD5jeY-GZM1TCWr9CQfvIApw5gMeuxVHwvf1QJhUoOwo=rw-w1920'
  ]

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex == images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex == 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleHover = () => {
    setIsHovered((prevState) => !prevState)
  }

  useEffect(() => {
    if (!isHovered) {
      setTimer(
        setInterval(() => {
          goToNextSlide()
        }, 3000)
      )
    } else {
      clearInterval(timer)
    }

    return () => {
      clearInterval(timer)
    }
  }, [isHovered])

  return (
    <div
      className="carousel"
      style={{ width: '100vw', height: '640px', left:'0' }}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <img src={images[currentIndex]} style={{ width: '100vw' }} alt="carousel slide" />

      {isHovered && (
        <div className="navigation">
          <button type="button" className="btn btn-outline-secondary" onClick={goToPrevSlide} style={{ backgroundColor: '#54bffe', borderRadius: '4px 50px 50px 4px', marginLeft: '-400px', }}><i className="fa-solid fa-chevron-left"></i></button>
          <button type="button" className="btn btn-outline-secondary" onClick={goToNextSlide} style={{ borderRadius: '50px 4px 4px 50px', backgroundColor: '#54bffe', marginRight: '-415px' }}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
      )}

      <div className="mydots">
        {images.map((image, index) => (
          <span
            key={index}
            className={index == currentIndex ? 'active' : ''}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>

      {/* <div className='pic_right'>
        <img src='https://lh3.googleusercontent.com/zEsg8YHLcM21VtypL8QupWgB8Vj-nzm3GX-dUnsT5JfVe59O1QzwDldup8ZXIHayLAm658-W1F4S8_gT3MCe3UHUO-sG5awQ=w300-rw'></img>
        <img src='https://lh3.googleusercontent.com/9V_zby1_B-tjpUPAuqZmNpm0X7phAPHgL9NQsdzPkCdXTT6nqTsstvdBJljkZbPOdYZomcfNFYYCE-PsoHpQIPzI5OeExDU=w300-rw' />
      </div> */}

      <div className='pic_bottom'>
        {["https://lh3.googleusercontent.com/zREU-R87qYMPXKcjz2ZZD7uGLu4byMP2Oa_YuYPcpmigM1FjlDRJ-Nf8bnxa9Wc6WUM3Zm_eI0c0LWHSsGICJ4GN5Oa7pcKt=w308-rw",
          "https://lh3.googleusercontent.com/F4CkjCAIXOr5rsWG__WLE6nSnTt1KzqHdw82fEEYD1mVi5siwVruPsT3sEtpGkKM0SaZ-SwJd8xXssxdoewdk7LBiN3A_3yT=w308-rw",
          "https://lh3.googleusercontent.com/I_Gkz1fguyrGpBvQ8XyOEboMY9s3eHl0_YHVUNhhU2vJ1cXOJOOw36FXEV8QMw273zY4J8vbF07uSReoYqU6YrMMp_7Ham4Z=w308-rw",
          "https://lh3.googleusercontent.com/OvQpNRKgpTZ66VwabKtD4AfC1UjMdQELUJdieCAWsjkzYQ1nDLrmbOO48lZLYa7yZqL0gL7aowNT6o8M7BT9XIYmaOOsC-4=w308-rw"].map(item => (
            <div key={Date.now() * Math.random()}>
              <img src={item} ></img>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Carousel
