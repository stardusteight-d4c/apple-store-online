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
  // console.log('items', items, 'id', id)

  const dispatch = useDispatch()

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }))

    toast.error(`${items[0].title} removed from basket`, {
      position: 'bottom-center',
    })
  }

  const style = {
    wrapper: `flex flex-col pb-5 border-b border-gray-300 gap-x-4 lg:flex-row lg:items-center`,
    imageContainer: `relative w-44 h-44`,
    informations: {
      container: `flex items-end flex-1 lg:items-center`,
      productContainer: `flex-1 scroll-py-4`,
      descriptionContainer: `flex flex-col text-xl gap-x-8 lg:flex-row lg:text-2xl`,
      title: `font-SFProText-600 lg:w-96`,
      chevronDownIconContainer: `flex items-end font-semibold gap-x-1`,
      ChevronDownIcon: `w-6 h-6 text-blue-500`,
      showProduct: `flex items-end text-blue-500 cursor-pointer hover:underline`,
      price: {
        container: `flex flex-col items-end space-y-4`,
        value: `text-xl font-SFProText-600 lg:text-2xl`,
        remove: `text-blue-500 hover:underline`,
      },
    },
  }

  const informations = style.informations

  return (
    <div className={style.wrapper}>
      <div className={style.imageContainer}>
        <Image
          src={urlFor(items[0].image[0]).url()}
          alt={`${items[0].title}/product`}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className={informations.container}>
        <div className={informations.productContainer}>
          <div className={informations.descriptionContainer}>
            <h4 className={informations.title}>{items[0].title}</h4>
            <p className={informations.chevronDownIconContainer}>
              {items.length}
              <ChevronDownIcon className={informations.ChevronDownIcon} />
            </p>
          </div>

          <p className={informations.showProduct}>
            Show product details
            <ChevronDownIcon className="w-6 h-6" />
          </p>
        </div>
        <div className={informations.price.container}>
          <h4 className={informations.price.value}>
            <Currency
              quantity={items.reduce((total, item) => total + item.price, 0)}
              currency="USD"
            />
          </h4>
          <button
            onClick={removeItemFromBasket}
            className={informations.price.remove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct
