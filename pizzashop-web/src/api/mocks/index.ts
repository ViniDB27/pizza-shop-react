import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { signInMock } from './sign-in.mock'
import { registerRestauranteMock } from './register-restaurant.mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount.mock'
import { getMonthOrdersAmountMock } from './get-month-orders-amount.mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount.mock'
import { getMonthRevenueMock } from './get-month-revenue.mock'

export const worker = setupWorker(
  signInMock,
  registerRestauranteMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock
)

export async function enableMsw() {
  if (env.MODE !== 'test') return
  worker.start()
}
