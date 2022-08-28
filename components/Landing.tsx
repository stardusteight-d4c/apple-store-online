import Image from 'next/image'
import React from 'react'
import Button from './Button'

const style = {
  wrapper: `sticky top-0 mx-auto font-SFProText-700 flex max-w-[1350px] h-screen items-center justify-between px-8`,
  heroCta: {
    container: `space-y-8`,
    message: `space-y-3 text-5xl tracking-wide lg:text-6xl xl:text-7xl`,
    spanEmphasis: `block text-transparent bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text`,
    span: `block`,
    ctaBtn: `space-x-8`,
  },
  heroImage: `relative hidden w-[450px] h-[450px] transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]`,
}

const Landing = () => {
  return (
    <section className={style.wrapper}>
      <div className={style.heroCta.container}>
        <h1 className={style.heroCta.message}>
          <span className={style.heroCta.spanEmphasis}>Powered</span>
          <span className={style.heroCta.span}>By Intellect</span>
          <span className={style.heroCta.span}>Driven By Values</span>
        </h1>

        <div className={style.heroCta.ctaBtn}>
          <Button title="Buy Now" />
          <a className="link">Learn More</a>
        </div>
      </div>

      <div className={style.heroImage}>
        <Image
          src="/iphone.png"
          alt="iphone/bannerImg"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </section>
  )
}

export default Landing
