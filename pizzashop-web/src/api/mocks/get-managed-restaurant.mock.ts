import { http, HttpResponse } from 'msw'
import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', async () => {
  return HttpResponse.json({
    id: '1',
    name: 'John Doe',
    createdAt: new Date(),
    updatedAt: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    managerId: '1',
  })
})
