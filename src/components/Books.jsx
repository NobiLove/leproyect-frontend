import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { allBooks } from '../graphql/queries';
import Button from './Button';

const Books = ({ show, setError }) => {
  const [loadData, { loading, data }] = useLazyQuery(allBooks, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    loadData()
  }, []) // eslint-disable-line

  if (!show) {
    return null
  }
  if (loading) {
    return <div>Loading...</div>
  }
  if (!data) {
    return null
  }

  return (
    <div>
      <h2>Books</h2>
      <div>
        <Button onClick={() => loadData({ variables: { genres: "refactoring" } })} text='Refactoring' />
        <Button onClick={() => loadData({ variables: { genres: "agile" } })} text='Agile' />
        <Button onClick={() => loadData({ variables: { genres: "patterns" } })} text='Patterns' />
        <Button onClick={() => loadData({ variables: { genres: "design" } })} text='Design' />
        <Button onClick={() => loadData({ variables: { genres: "crime" } })} text='Crime' />
        <Button onClick={() => loadData({ variables: { genres: "classic" } })} text='Classic' />
        <Button onClick={() => loadData({})} text='All Genres' />
      </div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}

export default Books
