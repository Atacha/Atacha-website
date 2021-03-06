import React, { useState, useEffect } from "react"
import IntroStep from "../IntroStep/IntroStep"
import styles from "./IntroSlider.module.scss"
import Dots from "../Dots/Dots"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"
const data = [
  {
    content: "Brinda a tu vida la posibilidad de cumplir todo aquello que siempre has deseado",
    imageUrl: "/images/Logotipo.svg",
  },
  {
    content: "Llena tu baúl con lo que más aprecias o estás dispuesto a cambiar",
    imageUrl: "/images/inventario2.gif",
  },
  {
    content: "Encuentra lo que buscas en el momento que lo deseas",
    imageUrl: "/images/deseos.gif",
  },
  {
    content: "Llega a un trato, cumple un deseo y conviertete en un Genio",
    imageUrl: "/images/trueque.gif",
  },
]

const IntroSlider: React.FC = () => {
  let touchStartX = 0
  let touchStartY = 0
  let touchEndX = 0
  let touchEndY = 0
  function WhatImustDo() {
    // Put a mensage in the console
    if (touchEndX < touchStartX) {
      return "left"
    }
    if (touchEndX > touchStartX) {
      return "right"
    }
    if (touchEndY < touchStartY) {
      return "down"
    }
    if (touchEndY > touchStartY) {
      return "up"
    }
    if (touchEndY === touchStartY && touchEndX === touchStartX) {
      return "tap"
    }
  }
  const [current, setCurrent] = useState(0)
  let myTimeout: any
  const length = data.length
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
    clearTimeout(myTimeout)
  }
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
    clearTimeout(myTimeout)
  }
  useEffect(() => {
    myTimeout = setTimeout(() => {
      nextSlide()
    }, 10000)
  }, [nextSlide, prevSlide])
  return (
    <>
      <section
        className={styles.IntroSlider}
        onTouchStart={(e) => {
          touchStartX = e.changedTouches[0].screenX
          touchStartY = e.changedTouches[0].screenY
        }}
        onTouchEnd={(e) => {
          touchEndX = e.changedTouches[0].screenX
          touchEndY = e.changedTouches[0].screenY
          const direction = WhatImustDo()
          if (direction === "left") {
            nextSlide()
          }
          if (direction === "right") {
            prevSlide()
          }
        }}
      >
        <FaChevronRight className={styles.leftArrow} onClick={nextSlide} />
        <FaChevronLeft className={styles.RightArrow} onClick={prevSlide} />

        {data.map((step, index) => (
          <IntroStep
            index={index}
            current={current}
            key={index}
            imageUrl={step.imageUrl}
            content={step.content}
            data={data}
          />
        ))}
        <Dots current={current} data={data} />
      </section>
    </>
  )
}

export default IntroSlider
