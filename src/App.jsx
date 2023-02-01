import { useState } from 'react'
import Authors from './pages/Authors'
import Books from './pages/Books'
import NewBook from './pages/NewBook'
import LoginForm from './pages/LoginForm'
import Recommendations from './pages/Recommendations'
import NotFound from './pages/NotFound'
import Menu from './components/Menu'
import Notify from './components/Notify'
import { BOOK_ADDED, allBooks } from './graphql/queries'
import { useApolloClient, useSubscription } from '@apollo/client'
import { Route, Routes, useNavigate } from 'react-router-dom'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      window.alert(`book: ${book.title} added`)
      notify(`${book.title} added`)
      client.cache.updateQuery({ query: allBooks }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(book)
        }
      })
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  return (
    <div className='bg-zinc-900 text-white h-screen'>
      <div className='container mx-auto'>
        <Notify errorMessage={errorMessage} />
        {token && <Menu logout={logout} />}
        <Routes>
          <Route path='/' element={<LoginForm setError={notify} setToken={setToken} />} />
          <Route path='/Authors' element={<Authors setError={notify} />} />
          <Route path='/Books' element={<Books setError={notify} />} />
          <Route path='/AddBook' element={<NewBook setError={notify} />} />
          <Route path='/Recommendations' element={<Recommendations setError={notify} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
