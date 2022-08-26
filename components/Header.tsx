import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <header>
      <div>
        <Image
          src="/apple-logo-black.png"
          alt="apple/logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </header>
  )
}

export default Header
