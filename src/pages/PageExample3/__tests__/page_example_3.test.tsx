import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils'
import PageExample3 from '..'
import { mockedUseNavigate } from 'mocks'
import * as mock from 'pages/PageExample3/mocks/mockedUseExampleAsyncSlice'
import * as store from 'store/exampleLoading/useExampleLoading'

let mockedUseExampleAsyncSlice = mock.useExampleAsyncSlice1

jest.mock('services', () => ({
  useGetRepositoriesWithRedux: () => mockedUseExampleAsyncSlice
}))

const verifyCall = jest.spyOn(
  mockedUseExampleAsyncSlice,
  'getFetchRepositories'
)

describe('[Page] PageExample3', () => {
  afterEach(() => jest.clearAllMocks())

  it('should render list of repositories when clicking "Search Repository" button if user in text field exists and if isLoading is false', () => {
    renderWithProviders(<PageExample3 />)

    const btn = screen.getByRole('button', { name: /search repositories/i })
    const repositoryListText1 = screen.getByText('example1')
    const repositoryListText2 = screen.getByText('example2')
    const input = screen.getByRole('textbox')

    userEvent.type(input, 'everton-dgn')
    userEvent.click(btn)

    expect(verifyCall).toHaveBeenCalledTimes(1)
    expect(repositoryListText1).toBeInTheDocument()
    expect(repositoryListText2).toBeInTheDocument()
  })

  it('should go to another page by clicking the button', () => {
    renderWithProviders(<PageExample3 />)

    const btn = screen.getByRole('button', { name: 'Return' })

    userEvent.click(btn)
    userEvent.hover(btn)

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
    expect(mockedUseNavigate).toHaveBeenCalledWith('/')
  })

  it('should render loading when clicking "Search Repository" button while isLoading for true', () => {
    mockedUseExampleAsyncSlice = mock.useExampleAsyncSlice3
    const spy = jest.spyOn(store, 'useExampleLoading').mockReturnValue({
      isLoading: true,
      setIsLoading: jest.fn()
    })

    renderWithProviders(<PageExample3 />)

    const loading = screen.getByRole('heading', { name: 'loading...' })
    const repositoryListText1 = screen.queryByText('example1')
    const repositoryListText2 = screen.queryByText('example2')

    expect(loading).toBeInTheDocument()
    expect(repositoryListText1).not.toBeInTheDocument()
    expect(repositoryListText2).not.toBeInTheDocument()

    spy.mockRestore()
  })

  it('should render error message to clicking "Search Repository" button if user in text field not exists and if isLoading is false', () => {
    mockedUseExampleAsyncSlice = mock.useExampleAsyncSlice2

    renderWithProviders(<PageExample3 />)

    const btn = screen.getByRole('button', { name: /search repositories/i })
    const error = screen.getByText(/not found/i)
    const repositoryListText1 = screen.queryByText('example1')
    const repositoryListText2 = screen.queryByText('example2')
    const input = screen.getByRole('textbox')

    userEvent.type(input, 'everton-dgn')
    userEvent.click(btn)

    expect(error).toBeInTheDocument()
    expect(verifyCall).toHaveBeenCalledTimes(1)
    expect(repositoryListText1).not.toBeInTheDocument()
    expect(repositoryListText2).not.toBeInTheDocument()
  })

  it('should not take any action if the text input is empty', () => {
    renderWithProviders(<PageExample3 />)

    const btn = screen.getByRole('button', { name: /search repositories/i })
    const error = screen.getByText(/not found/i)
    const repositoryListText1 = screen.queryByText('example1')
    const repositoryListText2 = screen.queryByText('example2')

    userEvent.click(btn)

    expect(verifyCall).toHaveBeenCalledTimes(0)
    expect(repositoryListText1).not.toBeInTheDocument()
    expect(repositoryListText2).not.toBeInTheDocument()
    expect(error).toBeInTheDocument()
  })
})