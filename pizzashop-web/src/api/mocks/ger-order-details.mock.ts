import { http, HttpResponse } from 'msw'
import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../ger-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', async ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '(11) 91234-5678',
    },
    status: 'pending',
    createdAt: '2023-10-01T00:00:00Z',
    totalInCents: 6000,
    orderItems: [
      {
        id: 'order-item-id',
        priceInCents: 1000,
        quantity: 2,
        product: {
          name: 'Product Name',
        },
      },
      {
        id: 'order-item-id-2',
        priceInCents: 2000,
        quantity: 2,
        product: {
          name: 'Product Name 2',
        },
      },
    ],
  })
})
