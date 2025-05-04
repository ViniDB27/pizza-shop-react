import { http, HttpResponse } from 'msw'
import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', async () => {
  return HttpResponse.json([
    {
      product: 'Pizza Margherita',
      amount: 26,
    },
    {
      product: 'Pizza Calabresa',
      amount: 18,
    },
    {
      product: 'Pizza Portuguesa',
      amount: 15,
    },
    {
      product: 'Pizza Quatro Queijos',
      amount: 12,
    },
    {
      product: 'Pizza de Frango com Catupiry',
      amount: 10,
    },
    {
      product: 'Pizza de Palmito',
      amount: 8,
    },
    {
      product: 'Pizza de Atum',
      amount: 6,
    },
    {
      product: 'Pizza de Marguerita',
      amount: 5,
    },
  ])
})
