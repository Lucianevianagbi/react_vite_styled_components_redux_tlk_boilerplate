import { screen } from '@testing-library/react'
import Error from '..'
import { renderWithProviders } from 'tests/providers'

describe('[Template] Error', () => {
  it('should render a children', () => {
    renderWithProviders(
      <Error>
        <p data-testid="select_template">Test Template</p>
      </Error>
    )
    const title = screen.getByRole('banner')
    expect(screen.getByTestId('select_template')).toBeInTheDocument()
    expect(title).toHaveTextContent('Template Error')
  })
})
