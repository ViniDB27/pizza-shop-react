import { http, HttpResponse } from 'msw'
import { GetOrdersQuery, GetOrdersResult } from '../get-orders'

type Orders = GetOrdersResult['orders']
type OrderStatus = GetOrdersResult['orders'][number]['status']

const orderStatuses: OrderStatus[] = [
  'pending',
  'canceled',
  'processing',
  'delivering',
  'delivered',
]

const orders: Orders = Array.from({ length: 60 }, (_, index) => ({
  orderId: `order-${index + 1}`,
  customerName: `Customer ${index + 1}`,
  total: Math.floor(Math.random() * 100) + 1,
  status: orderStatuses[index % 5],
  createdAt: new Date().toISOString(),
}))

export const getOrdersMock = http.get<never, GetOrdersQuery, GetOrdersResult>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0

    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')

    let filteredOrders = orders

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName)
      )
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId)
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex: pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  }
)
