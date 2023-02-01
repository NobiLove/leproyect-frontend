import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { allBooks } from '../graphql/queries'
import Button from '../components/Button'

const Books = ({ setError }) => {
  const [loadData, { loading, data }] = useLazyQuery(allBooks, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    loadData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (!data) {
    return null
  }

  return (
    <div>
      <div>
        <h1 className='flex justify-center text-4xl pb-6'>Books</h1>
      </div>
      <div className='flex justify-around pb-4'>
        <Button onClick={() => loadData({ variables: { genres: 'refactoring' } })} text='Refactoring' />
        <Button onClick={() => loadData({ variables: { genres: 'agile' } })} text='Agile' />
        <Button onClick={() => loadData({ variables: { genres: 'patterns' } })} text='Patterns' />
        <Button onClick={() => loadData({ variables: { genres: 'design' } })} text='Design' />
        <Button onClick={() => loadData({ variables: { genres: 'crime' } })} text='Crime' />
        <Button onClick={() => loadData({ variables: { genres: 'classic' } })} text='Classic' />
        <Button onClick={() => loadData({})} text='All Genres' />
      </div>
      <div className='flex justify-center'>
        <table className='border-separate border-spacing-2 border border-slate-500'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {data.allBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Books
