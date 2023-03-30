import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('App renders', async () => {
  const user = userEvent.setup()
  const app = render(<App />)
  const textareaFrom = app.getByPlaceholderText('Enter text')

  await user.type(textareaFrom, 'Hello World')
  const result = await app.findByDisplayValue(/Hola mundo/i, {}, { timeout: 2000 })

  expect(result).toBeTruthy()
})
