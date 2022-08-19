import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED, allBooks } from './graphql/queries'
import Button from './components/Button'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

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
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      //<div className="bg-zinc-900 h-screen text-white">
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <Button onClick={() => setPage('authors')} text='Authors' />
        <Button onClick={() => setPage('books')} text='Books' />
        <Button onClick={() => setPage('add')} text='Add Book' />
        <Button onClick={() => setPage('recommendations')} text='Recommendations' />
        <Button onClick={() => logout()} text='Logout' />
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} setError={notify} />
      <Books show={page === 'books'} setError={notify} />
      <NewBook show={page === 'add'} setError={notify} />
      <Recommendations show={page === 'recommendations'} setError={notify} />
    </div>
  )
}

export default App
