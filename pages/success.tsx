import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import { useSession } from "next-auth/react";
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import Currency from 'react-currency-formatter'
import { fetchLineItems } from '../utils/fetchLineItems'

import Button from '../components/Button'

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline'
import { useMediaQuery } from 'react-responsive'

interface Props {
  products: StripeProduct[]
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const sessionId = query.session_id as string
  const products = await fetchLineItems(sessionId)

  return {
    props: {
      products,
    },
  }
}

const Success = ({ products }: Props) => {
  console.log(products)

  const router = useRouter()
  const { session_id } = router.query
  const [mounted, setMounted] = useState(false)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const subtotal = products.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  // showOrderSummary always true for desktop but only conditionally true for mobile
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary)
  }

  return (
    <div>
      <Head>
        <title>Thank you! - Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="max-w-xl mx-auto">
        <Link href="/">
          <div className="relative w-8 h-16 ml-4 transition cursor-pointer lg:hidden">
            <Image
              src="/apple-logo-black.png"
              layout="fill"
              objectFit="contain"
              alt="apple/logo"
            />
          </div>
        </Link>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-9">
        <section className="order-2 max-w-xl pb-12 mx-auto lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
          <Link href="/">
            <div className="relative hidden w-12 h-24 transition cursor-pointer ml-14 lg:inline-flex">
              <Image
                src="/apple-logo-black.png"
                layout="fill"
                objectFit="contain"
                alt="apple/logo"
              />
            </div>
          </Link>

          <div className="flex my-8 ml-4 space-x-4 lg:ml-14 xl:ml-0">
            <div className="flex items-center justify-center border-2 border-black rounded-full h-11 w-11">
              <CheckIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className="text-lg">
                Thank you{' '}
                {/* {session ? session.user?.name?.split(' ')[0] : 'Guest'} */}
              </h4>
            </div>
          </div>

          <div className="p-4 mx-4 border border-gray-300 divide-y divide-gray-300 rounded-md lg:ml-14">
            <div className="pb-3 space-y-2">
              <p>Your order is confirmed</p>
              <p className="text-sm text-gray-600">
                We’ve accepted your order, and we’re getting it ready. Come back
                to this page for updates on your shipment status.
              </p>
            </div>
            <div className="pt-3 text-sm">
              <p className="font-medium text-gray-600">
                Other tracking number:
              </p>
              <p>CNB21441622</p>
            </div>
          </div>

          <div className="p-4 mx-4 my-4 space-y-2 border border-gray-300 rounded-md lg:ml-14">
            <p>Order updates</p>
            <p className="text-sm text-gray-600">
              You’ll get shipping and delivery updates by email and text.
            </p>
          </div>
          <div className="flex flex-col items-center justify-between mx-4 text-sm lg:ml-14 lg:flex-row">
            <p className="hidden lg:inline">Need help? Contact us</p>
            {mounted && (
              <Button
                title="Continue Shopping"
                onClick={() => router.push('/')}
                width={isTabletOrMobile ? 'w-full' : undefined}
                padding="py-4"
              />
            )}
          </div>
        </section>

        {mounted && (
          <section className="overflow-y-scroll border-y border-l border-gray-300 bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
              className={`w-full ${
                showOrderSummaryCondition && 'border-b'
              } border-gray-300 text-sm lg:hidden`}
            >
              <div className="flex items-center justify-between max-w-xl px-4 py-6 mx-auto">
                <button
                  onClick={handleShowOrderSummary}
                  className="flex items-center space-x-2"
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  <p>Show order summary</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>

                <p className="text-xl font-medium text-black">
                  <Currency quantity={subtotal + 20} />
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && (
              <div className="max-w-xl px-4 py-4 mx-auto border-gray-300 divide-y lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16">
                <div className="pb-4 space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 text-sm font-medium"
                    >
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1] text-xs text-white">
                        <div className="relative rounded-md h-7 w-7 animate-bounce">
                          <Image
                            src="/apple-logo-black.png"
                            layout="fill"
                            objectFit="contain"
                            alt="apple/logo"
                          />
                        </div>
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs">
                          {product.quantity}
                        </div>
                      </div>
                      <p className="flex-1">{product.description}</p>
                      <p>
                        <Currency
                          quantity={product.price.unit_amount / 100}
                          currency={product.currency}
                        />
                      </p>
                    </div>
                  ))}
                </div>
                <div className="py-4 space-y-1">
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Subtotal</p>
                    <p className="font-medium">
                      <Currency quantity={subtotal} />
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Discount</p>
                    <p className="text-[gray]"></p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Shipping</p>
                    <p className="font-medium">
                      <Currency quantity={20} currency="USD" />
                    </p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <p>Total</p>
                  <p className="flex items-center gap-x-2 text-xs text-[gray]">
                    USD
                    <span className="text-xl font-medium text-black">
                      <Currency quantity={subtotal + 20} />
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default Success
