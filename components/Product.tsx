import Image from 'next/image'
import React from 'react'
import { urlFor } from '../sanity'

import { useDispatch } from 'react-redux'
import { addToBasket } from '../redux/basketSlice'

import toast from 'react-hot-toast'
import { ShoppingCartIcon } from '@heroicons/react/outline'

interface Props {
  product: Product
}

const Product = ({ product }: Props) => {
  const dispatch = useDispatch()

  const addItemToBasket = () => {
    dispatch(addToBasket(product))

    toast.success(`${product.title} added to basket`, {
      position: 'bottom-center',
    })
  }

  const style = {
    wrapper: `flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#35383c] p-8 md:h-[500px] md:w-[400px] md:p-10`,
    imageContainer: `relative w-full h-64 md:h-72`,
    information: {
      container: `flex items-center justify-between flex-1 space-x-3`,
      purchaseInfos: `space-y-2 text-xl text-white md:text-2xl`,
      shopCartIconContainer: `flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]`,
      ShoppingCartIcon: `w-8 h-8 text-white`,
    },
  }

  return (
    <div className={style.wrapper}>
      <div className={style.imageContainer}>
        <Image
          src={urlFor(product.image[0]).url()}
          alt={`${product.title}/product`}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className={style.information.container}>
        <div className={style.information.purchaseInfos}>
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>

        <div
          onClick={addItemToBasket}
          className={style.information.shopCartIconContainer}
        >
          <ShoppingCartIcon
            className={style.information.ShoppingCartIcon}
          />
        </div>
      </div>
    </div>
  )
}

export default Product
