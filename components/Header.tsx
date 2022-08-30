import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../redux/basketSlice'
import { signIn, signOut, useSession } from 'next-auth/react'

import { SearchIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/outline'

const style = {
  wrapper: `sticky top-0 z-30 flex w-full items-center justify-between bg-[#e7ecee] p-4`,
  logoImageContainer: `flex items-center justify-center md:w-1/5`,
  logoImageItem: `relative w-5 h-10 cursor-pointer opacity-75 transition hover:opacity-100`,
  linkContainer: `hidden flex-1 items-center justify-center space-x-8 md:flex`,
  linkItem: `cursor-pointer opacity-75 transition hover:opacity-100`,
  iconContainer: `flex items-center justify-center gap-x-4 md:w-1/5`,
  iconItem: `h-6 w-6 cursor-pointer opacity-75 transition hover:opacity-100`,
  shopIcon: {
    iconContainer: `relative cursor-pointer`,
    notify: `absolute z-50 flex items-center justify-center w-4 h-4 text-white rounded-full -right-1 -top-1 bg-gradient-to-r from-pink-500 to-violet-500 text-[10px]`,
  },
  profileIcon: `rounded-full cursor-pointer`,
}

const Header = () => {
  const { data: session } = useSession()
  const items = useSelector(selectBasketItems)

  return (
    <header className={style.wrapper}>
      <div className={style.logoImageContainer}>
        <Link href="/">
          <div className={style.logoImageItem}>
            <Image
              src="/apple-logo-black.png"
              alt="apple/logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>
      </div>
      <div className={style.linkContainer}>
        <a className={style.linkItem}>Product</a>
        <a className={style.linkItem}>Explore</a>
        <a className={style.linkItem}>Support</a>
        <a className={style.linkItem}>Business</a>
      </div>
      <div className={style.iconContainer}>
        <SearchIcon className={style.iconItem} />
        <Link href="/checkout">
          <div className={style.shopIcon.iconContainer}>
            {items.length > 0 && (
              <span className={style.shopIcon.notify}>{items.length}</span>
            )}

            <ShoppingBagIcon className={style.iconItem} />
          </div>
        </Link>

        {session ? (
          <Image
            src={session.user?.image || '/avatar-default.jpg'}
            alt="profile/pic"
            className={style.profileIcon}
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <UserIcon className={style.iconItem} onClick={() => signIn()} />
        )}
      </div>
    </header>
  )
}

export default Header
