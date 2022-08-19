import React from 'react'

const Input = ({ onChange, value, type }) => {
  return (
    <input className='bg-black rounded-lg shadow-md'
      type={type}
      value={value}
      onChange={onChange} />
  )
}
export default Input
