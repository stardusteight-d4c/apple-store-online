import Image from 'next/image'
import React from 'react'
import { urlFor } from '../sanity'
import { ShoppingCartIcon } from '@heroicons/react/outline'

interface Props {
  product: Product
}

const Product = ({ product }: Props) => {
  // console.log(product)

  return (
    <div className="flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#35383c] p-8 md:h-[500px] md:w-[400px] md:p-10">
      <div className="relative w-full h-64 md:h-72">
        <Image
          src={urlFor(product.image[0]).url()}
          alt={`${product.title}/product`}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex items-center justify-between flex-1 space-x-3">
        <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>

        <div className="flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]">
          <ShoppingCartIcon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  )
}

export default Product
