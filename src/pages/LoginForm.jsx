import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/queries'
import Button from '../components/Button'
import Input from '../components/Input'
import Label from '../components/Label'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      console.log(token)
      setToken(token)
      window.localStorage.setItem('library-token', token)
      navigate('/Authors')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div className='container mx-auto flex h-screen justify-center place-items-center'>
      <form className='bg-slate-800 rounded-lg shadow-md' onSubmit={submit}>
        <div className='mx-4 my-2 py-1'>
          <Label text='Username: ' />
          <Input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div className='mx-4 my-2 py-1'>
          <Label text='Password: ' />
          <Input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div className='mx-4 my-8 py-1'>
          <Button text='Login'>Login</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
