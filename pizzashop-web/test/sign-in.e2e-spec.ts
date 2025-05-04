import { test, expect } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })
  await page
    .getByRole('textbox', { name: 'Seu e-mail' })
    .fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticaçào para o seu e-mail'
  )
  expect(toast).toBeVisible()
  // await page.waitForTimeout(2000)
})

test('sign in with wrong creadentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })
  await page
    .getByRole('textbox', { name: 'Seu e-mail' })
    .fill('wrong@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Credenciais invalidas.')
  expect(toast).toBeVisible()
  // await page.waitForTimeout(2000)
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Novo estabelicimento' }).click()
  expect(page.url()).toContain('/sign-up')
  // await page.waitForTimeout(2000)
})
