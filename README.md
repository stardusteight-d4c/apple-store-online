# Apple Store | Fully Functional E-commerce

![banner](banner.png)

> Construction of an e-commerce taught in the `ILW Yennefer` channel where we use Redux to manage the global state of the application as the product basket in which Reducers was used to add and remove items from the shopping basket. The CMS `Sanity.io` was used to manage the products that are available for sale on the site, such as storing all necessary product information in their respective fields. Finally, we use the `Stripe API` as a Payments Infrastructure, where we can accept payments, send payments and manage our online business.

## Sanity.io (Content Management System)

In this project, Sanity.io was used as a CMS, which allows you to create, edit, manage and publish content on digital platforms, allowing it to be modified, removed and added without the need to know the HTML markup language. Incorporating a Content Management System in our websites allows us to have a better management of the content of our website, so we don't need to leave this entire management system attached to the website, so all CRUD and content access permissions adopt an external service designed on this.

To embed Sanity.io in your project we must first have globally installed its Command Line Interface: `npm install -g @sanity/cli`. With CLI Tooling installed, we can start implementing Sanity.io to the project with `sanity init`, right after the initial configurations are started we will have a directory where we can access the Sanity Studio development server, to access it execute `sanity start ` inside the studio directory.

### Sanity Studio Directory

The `schema.js` file inside the `schemas` directory is where we will build the content model, how its information will be stored and presented in Sanity Studio, as well as the relationship between other documents and contents. Let's see the file of one of the E-Commerce schemas:

```js
// studio/schemas/category.js

import { BiCategory } from 'react-icons/bi'

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: BiCategory,
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
  ],
}
```
Our schema is defined through a structured `Javascript Object` with its proper properties and values, in which other documents can have fields that refer to other documents:

```js
// studio/schemas/product.js
{
  name: 'category',
  title: 'Category',
  type: 'reference',
  to: [{ type: 'category' }],
},

```


