import { screen } from '@testing-library/react'
import { renderWithProviders } from 'tests/providers'
import Input from '..'

describe('[Component] Input', () => {
  it('should render the Input', () => {
    renderWithProviders(
      <Input
        name="searchRepositoriesInTheGithub"
        placeholder="Nome de usuário"
      />
    )

    const wrapper = screen.getByRole('textbox')

    expect(wrapper).toBeInTheDocument()
  })
})
