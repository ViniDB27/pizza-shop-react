import { http, HttpResponse } from 'msw'
import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '(11) 91234-5678',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  }
)
