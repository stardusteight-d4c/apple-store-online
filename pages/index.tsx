import { Tab } from '@headlessui/react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Landing from '../components/Landing'
import Product from '../components/Product'
import { fetchCategories } from '../utils/fetchCategories'
import { fetchProducts } from '../utils/fetchProducts'

interface Props {
  categories: Category[]
  products: Product[]
}

// Backend Code
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const categories = await fetchCategories()
  const products = await fetchProducts()

  return {
    props: {
      categories,
      products,
    },
  }
}

// Frontend code
const Home = ({ categories, products }: Props) => {
  const showProducts = (category: number) => {
    // filter products by category
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => <Product product={product} key={product._id} />)
  }

  return (
    <div className="">
      <Head>
        <title>Apple Store Online</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <Basket /> */}

      <main className="relative h-[200vh] bg-[#E7ECEE]">
        <Landing />
      </main>
      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]">
        <div className="py-16 space-y-10">
          <h1 className="text-4xl font-medium tracking-wide text-center text-white md:text-5xl">
            New Promos
          </h1>

          <Tab.Group>
            <Tab.List className="flex justify-center">
              {categories.map((category) => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                      selected
                        ? 'borderGradient bg-[#35383C] text-white'
                        : 'border-b-2 border-[#35383C] text-[#747474]'
                    }`
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="pt-10 pb-24 mx-auto max-w-fit sm:px-4">
              <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(3)}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  )
}

export default Home
