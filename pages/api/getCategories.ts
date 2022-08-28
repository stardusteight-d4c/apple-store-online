import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../sanity'

const query = `*[_type == "category"] {
_id,
  ...
}`

type Data = {
  categories: Category[]
}

// Rotas de API devem retornar uma função como padrão
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = await sanityClient.fetch(query)
  res.status(200).json({ categories })
}
