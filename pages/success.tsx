import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
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

const style = {
  weakText: `text-sm text-gray-600`,
  header: {
    wrapper: `max-w-xl mx-auto`,
    imageContainer: `relative w-8 h-16 ml-4 transition cursor-pointer lg:hidden`,
  },
  gridContainer: `grid grid-cols-1 lg:grid-cols-9`,
  firstSection: {
    container: `order-2 max-w-xl pb-12 mx-auto lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44`,
    logoContainer: `relative hidden w-12 h-24 transition cursor-pointer ml-14 lg:inline-flex`,
    thank: `flex my-8 ml-4 space-x-4 lg:ml-14 xl:ml-0`,
    iconCheck: `flex items-center justify-center border-2 border-black rounded-full h-11 w-11`,
    order: `text-sm text-gray-600`,
    thankYou: `text-lg`,
    firstCard: {
      container: `p-4 mx-4 border border-gray-300 divide-y divide-gray-300 rounded-md lg:ml-14`,
      wrapperInfo: `pb-3 space-y-2`,
      trackingNumber: `pt-3 text-sm`,
    },
    secondCard: {
      container: `p-4 mx-4 my-4 space-y-2 border border-gray-300 rounded-md lg:ml-14`,
    },
    footer: {
      container: `flex flex-col items-center justify-between mx-4 text-sm lg:ml-14 lg:flex-row`,
      contactUs: `hidden lg:inline`,
    },
  },
  secondSection: {
    container: `overflow-y-scroll border-y border-l border-gray-300 bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0`,
    showOrderSummary: {
      wrapper: `w-full border-gray-300 text-sm lg:hidden`,
      container: `flex items-center justify-between max-w-xl px-4 py-6 mx-auto`,
      toggleBtn: `flex items-center space-x-2`,
      total: `text-xl font-medium text-black`,
    },
    showOrderSummaryConditionTrue: {
      container: `max-w-xl px-4 py-4 mx-auto border-gray-300 divide-y lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16`,
      tag: {
        wrapper: `pb-4 space-y-4`,
        container: `flex items-center space-x-4 text-sm font-medium`,
        appleProduct: `relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1] text-xs text-white`,
        appleIconAnimated: `relative rounded-md h-7 w-7 animate-bounce`,
        quantity: `absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs`,
        description: `flex-1`,
      },
      purchaseInformation: {
        container: `py-4 space-y-1`,
        info: `flex justify-between text-sm`,
      },
      total: {
        container: `flex justify-between pt-4`,
        usd: `flex items-center gap-x-2 text-xs text-[gray]`,
        currency: `text-xl font-medium text-black`,
      },
    },
  },
}

const firstSection = style.firstSection
const secondSection = style.secondSection
const showOrderSummaryConditionTrue =
  secondSection.showOrderSummaryConditionTrue
const tag = secondSection.showOrderSummaryConditionTrue.tag
const purchaseInformation =
  secondSection.showOrderSummaryConditionTrue.purchaseInformation
const total = secondSection.showOrderSummaryConditionTrue.total

const Success = ({ products }: Props) => {
  const router = useRouter()
  const { session_id } = router.query
  const [mounted, setMounted] = useState(false)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const { data: session } = useSession()
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
      <header className={style.header.wrapper}>
        <Link href="/">
          <div className={style.header.imageContainer}>
            <Image
              src="/apple-logo-black.png"
              layout="fill"
              objectFit="contain"
              alt="apple/logo"
            />
          </div>
        </Link>
      </header>

      <main className={style.gridContainer}>
        <section className={firstSection.container}>
          <Link href="/">
            <div className={firstSection.logoContainer}>
              <Image
                src="/apple-logo-black.png"
                layout="fill"
                objectFit="contain"
                alt="apple/logo"
              />
            </div>
          </Link>

          <div className={firstSection.thank}>
            <div className={firstSection.iconCheck}>
              <CheckIcon className="w-8 h-8" />
            </div>
            <div>
              <p className={firstSection.order}>
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className={firstSection.thankYou}>
                Thank you{' '}
                {session ? session.user?.name?.split(' ')[0] : 'Guest'}
              </h4>
            </div>
          </div>

          <div className={firstSection.firstCard.container}>
            <div className={firstSection.firstCard.wrapperInfo}>
              <p>Your order is confirmed</p>
              <p className={style.weakText}>
                We’ve accepted your order, and we’re getting it ready. Come back
                to this page for updates on your shipment status.
              </p>
            </div>
            <div className={firstSection.firstCard.trackingNumber}>
              <p className={style.weakText}>Other tracking number:</p>
              <p>CNB21441622</p>
            </div>
          </div>

          <div className={firstSection.secondCard.container}>
            <p>Order updates</p>
            <p className={style.weakText}>
              You’ll get shipping and delivery updates by email and text.
            </p>
          </div>
          <div className={firstSection.footer.container}>
            <p className={firstSection.footer.contactUs}>
              Need help? Contact us
            </p>
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
          <section className={secondSection.container}>
            <div
              className={`${secondSection.showOrderSummary.wrapper} ${
                showOrderSummaryCondition && 'border-b'
              }`}
            >
              <div className={secondSection.showOrderSummary.container}>
                <button
                  onClick={handleShowOrderSummary}
                  className={secondSection.showOrderSummary.toggleBtn}
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  <p>Show order summary</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>

                <p className={secondSection.showOrderSummary.total}>
                  <Currency quantity={subtotal + 20} />
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && (
              <div className={showOrderSummaryConditionTrue.container}>
                <div className={tag.wrapper}>
                  {products.map((product) => (
                    <div key={product.id} className={tag.container}>
                      <div className={tag.appleProduct}>
                        <div className={tag.appleIconAnimated}>
                          <Image
                            src="/apple-logo-black.png"
                            layout="fill"
                            objectFit="contain"
                            alt="apple/logo"
                          />
                        </div>
                        <div className={tag.quantity}>{product.quantity}</div>
                      </div>
                      <p className={tag.description}>{product.description}</p>
                      <p>
                        <Currency
                          quantity={product.price.unit_amount / 100}
                          currency={product.currency}
                        />
                      </p>
                    </div>
                  ))}
                </div>
                <div className={purchaseInformation.container}>
                  <div className={purchaseInformation.info}>
                    <p className="text-[gray]">Subtotal</p>
                    <p className="font-medium">
                      <Currency quantity={subtotal} />
                    </p>
                  </div>
                  <div className={purchaseInformation.info}>
                    <p className="text-[gray]">Discount</p>
                    <p className="text-[gray]"></p>
                  </div>
                  <div className={purchaseInformation.info}>
                    <p className="text-[gray]">Shipping</p>
                    <p className="font-medium">
                      <Currency quantity={20} currency="USD" />
                    </p>
                  </div>
                </div>
                <div className={total.container}>
                  <p>Total</p>
                  <p className={total.usd}>
                    USD
                    <span className={total.currency}>
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
