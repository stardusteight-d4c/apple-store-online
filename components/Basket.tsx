import React from 'react'
import { ShoppingBagIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../redux/basketSlice'

const Basket = () => {
  const items = useSelector(selectBasketItems)

  if (items.length === 0) return null

  return (
    <Link href="/checkout">
      <div className="fixed z-50 flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full cursor-pointer bottom-10 right-10">
        {items.length > 0 && (
          <span className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
            {items.length}
          </span>
        )}
        <ShoppingBagIcon className="w-8 h-8 headerIcon" />
      </div>
    </Link>
  )
}

export default Basket
