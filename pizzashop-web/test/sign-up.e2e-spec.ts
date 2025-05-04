import { test, expect } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page
    .getByRole('textbox', { name: 'Nome do estabelecimento' })
    .fill('Pizza Shop')
  await page.getByRole('textbox', { name: 'Seu nome' }).fill('John Doe')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('11999999999')
  await page
    .getByRole('textbox', { name: 'Seu e-mail' })
    .fill('johndoe@example.com')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()
  const toast = page.getByText('Restaurando cadastrado com sucesso!')
  expect(toast).toBeVisible()
  await page.getByRole('button', { name: 'Login' }).click()
  expect(page.url()).toContain('/sign-in')
  expect(page.url()).toContain('johndoe@example.com')
  const emailInputValue = await page
    .getByRole('textbox', { name: 'Seu e-mail' })
    .inputValue()
  expect(emailInputValue).toEqual('johndoe@example.com')
})

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page
    .getByRole('textbox', { name: 'Nome do estabelecimento' })
    .fill('Wrong Shop')
  await page.getByRole('textbox', { name: 'Seu nome' }).fill('John Doe')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('11999999999')
  await page
    .getByRole('textbox', { name: 'Seu e-mail' })
    .fill('johndoe@example.com')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()
  const toast = page.getByText('Erro ao cadastrar restaurante.')
  expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Fazer login' }).click()
  expect(page.url()).toContain('/sign-in')
  // await page.waitForTimeout(2000)
})
