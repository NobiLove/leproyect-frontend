import { useQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import Select from 'react-select'
import { allAuthors, editAuthor } from '../graphql/queries'
import Button from '../components/Button'
import Label from '../components/Label'
import Input from '../components/Input'

const Authors = ({ setError }) => {
  const { loading, data } = useQuery(allAuthors, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const [changueBorn] = useMutation(editAuthor)
  const [born, setBorn] = useState(0)
  const [name, setName] = useState('')

  if (loading) {
    return <div>Loading...</div>
  }
  const options = data.allAuthors.map(a => {
    return { value: a.name, label: a.name }
  })

  function handleSelect (e) {
    setName(e.value)
  }

  function handleUpdateBorn (e) {
    e.preventDefault()
    changueBorn({ variables: { name, born: parseInt(born, 10) } })
    setBorn(0)
  }

  return (
    <div>
      <div>
        <h2>Authors</h2>
        <table className='py-5'>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Born</th>
              <th>Books</th>
            </tr>
            {data.allAuthors.map(a => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set Born</h2>
        <form onSubmit={handleUpdateBorn}>
          <Select onChange={handleSelect} options={options} />
          <Label text='Born: ' />
          <Input value={born} onChange={({ target }) => setBorn(target.value)} />
          <Button text='Update Born' />
        </form>
      </div>
    </div>
  )
}

export default Authors
