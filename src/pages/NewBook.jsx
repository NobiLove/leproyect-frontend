import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { createBook, allBooks, allAuthors } from '../graphql/queries'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [kreateBook] = useMutation(createBook, {
    refetchQueries: [{ query: allBooks }, { query: allAuthors }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    kreateBook({ variables: { title, author, published: parseInt(published, 10), genres } })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={submit}>
        <div>
          <Label text='Title:' />
          <Input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <Label text='Author:' />
          <Input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <Label text='Published:' />
          <Input type='number' value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <Label text='Add genre:' />
          <Input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type='button'>Add Genre</button>
        </div>
        <div>
          <Label text='Genres:' />
          {genres.join(' ')}
        </div>
        <Button text='Create Book<' />
      </form>
    </div>
  )
}

export default NewBook
