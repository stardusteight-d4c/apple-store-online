import React from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { removeFromBasket } from '../redux/basketSlice'
import { urlFor } from '../sanity'
import Currency from 'react-currency-formatter'
import toast from 'react-hot-toast'
import { ChevronDownIcon } from '@heroicons/react/outline'

interface Props {
  items: Product[]
  id: string
}

const CheckoutProduct = ({ items, id }: Props) => {
  console.log('items', items, 'id', id)

  const dispatch = useDispatch()

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }))

    toast.error(`${items[0].title} removed from basket`, {
      position: 'bottom-center',
    })
  }

  return (
    <div className="flex flex-col pb-5 border-b border-gray-300 gap-x-4 lg:flex-row lg:items-center">
      <div className="relative w-44 h-44">
        <Image
          src={urlFor(items[0].image[0]).url()}
          alt={`${items[0].title}/product`}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex items-end flex-1 lg:items-center">
        <div className="flex-1 scroll-py-4">
          <div className="flex flex-col text-xl gap-x-8 lg:flex-row lg:text-2xl">
            <h4 className="font-SFProText-600 lg:w-96">{items[0].title}</h4>
            <p className="flex items-end font-semibold gap-x-1">
              {items.length}
              <ChevronDownIcon className="w-6 h-6 text-blue-500" />
            </p>
          </div>

          <p className="flex items-end text-blue-500 cursor-pointer hover:underline">
            Show product details
            <ChevronDownIcon className="w-6 h-6" />
          </p>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-xl font-SFProText-600 lg:text-2xl">
            <Currency
              quantity={items.reduce((total, item) => total + item.price, 0)}
              currency="USD"
            />
          </h4>
          <button
            onClick={removeItemFromBasket}
            className="text-blue-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct
