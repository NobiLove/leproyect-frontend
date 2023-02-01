import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const Menu = ({ logout }) => {
  return (
    <div className='flex justify-around pt-6'>
      <Link className='font-thin hover:text-purple-600 px-4 text-2xl' to='/Authors'>Authors</Link>
      <Link className='font-thin hover:text-purple-600 px-4 text-2xl' to='/Books'>Books</Link>
      <Link className='font-thin hover:text-purple-600 px-4 text-2xl' to='/AddBook'>Add Book</Link>
      <Link className='font-thin hover:text-purple-600 px-4 text-2xl' to='/Recommendations'>Recommendations</Link>
      <Button onClick={logout} text='Logout' />
    </div>
  )
}
export default Menu
