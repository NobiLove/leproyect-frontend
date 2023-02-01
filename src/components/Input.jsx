import React from 'react'

const Input = ({ onChange, value, type }) => {
  return (
    <input
      className='bg-black rounded-lg shadow-md py-1 px-2'
      type={type}
      value={value}
      onChange={onChange}
    />
  )
}
export default Input
