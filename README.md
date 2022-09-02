# Apple Store | Fully Functional E-commerce

![banner](banner.png)

> Construction of an e-commerce taught in the `ILW Yennefer` channel where we use Redux to manage the global state of the application as the product basket in which Reducers was used to add and remove items from the shopping basket. The CMS `Sanity.io` was used to manage the products that are available for sale on the site, such as storing all necessary product information in their respective fields. Finally, we use the `Stripe API` as a Payments Infrastructure, where we can accept payments, send payments and manage our online business.

<br />

## Sanity.io (Content Management System)

In this project, Sanity.io was used as a CMS, which allows you to create, edit, manage and publish content on digital platforms, allowing it to be modified, removed and added without the need to know the HTML markup language. Incorporating a Content Management System in our websites allows us to have a better management of the content of our website, so we don't need to leave this entire management system attached to the website, so all CRUD and content access permissions adopt an external service designed on this.

To embed Sanity.io in your project we must first have globally installed its Command Line Interface: `npm install -g @sanity/cli`. With CLI Tooling installed, we can start implementing Sanity.io to the project with `sanity init`, right after the initial configurations are started we will have a directory where we can access the Sanity Studio development server, to access it execute `sanity start ` inside the studio directory.

### Sanity Studio Directory

The `schema.js` file inside the `schemas` directory is where we will build the content model, how its information will be stored and presented in Sanity Studio, as well as the relationship between other documents and contents. Our schema is defined through a structured Javascript Object with its proper properties and values, in which other documents can have fields that refer to other documents:

```js
// studio/schemas/product.js

import { RiMacbookLine } from 'react-icons/ri'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: RiMacbookLine,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
  ],
}
```
### Query Language (GROQ)

GROQ is Sanity's open-source query language. It's a powerful and intuitive language that's easy to learn. With GROQ you can describe exactly what information your application needs, join information from several sets of documents, and stitch together a very specific response with only the exact fields you need. *<i>sanity.io/docs/overview-groq</i>

With GROQ queries we can make requests to Sanity Studio through the api route:

```ts
// pages/api/getProducts.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../../sanity'

const query = groq`*[_type == "product"] {
_id,
  ...
} | order(_createdAt asc)`

type Data = {
  products: Product[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const products: Product[] = await sanityClient.fetch(query)
  res.status(200).json({ products })
}
```

While the api route is responsible for performing queries and communicating with the CMS, the `utils` directory is responsible for acquiring this data by making the request to the desired endpoints:

```ts
// utils/fetchProducts.ts 

export const fetchProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getProducts`)

  const data = await res.json()
  const products: Product[] = data.products

  return products
}
```

<br />

## Server-Side Rendering

With the export of the getServerSideProps function to Next.js you will pre-render this page on each request using the data returned by getServerSideProps. This is useful if you want to fetch data that changes frequently and make the page to be for updated the most current data. This is necessary in an E-commerce context because we do not want a product that is no longer selling visible on the page, allowing even its purchase. The getServerSideProps function returns properties that must be consumed by the page component.

```ts
// pages/index.tsx

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const categories = await fetchCategories()
  const products = await fetchProducts()
  const session = await getSession(context)

  return {
    props: {
      categories,
      products,
      session,
    },
  }
}

```

<br />

## Redux Toolkit

Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.



