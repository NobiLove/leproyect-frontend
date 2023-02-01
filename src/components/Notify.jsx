const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div className='bg-red-500 text-black font-bold rounded-xl py-2 px-2'>
      {errorMessage}
    </div>
  )
}

export default Notify
