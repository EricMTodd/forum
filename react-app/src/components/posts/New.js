const New = ({
  currentUser
}) => {

  const handleSubmit = e => {
    e.preventDefault()
    console.log(handleSubmit)
  }

  return(
    <div id='new-post-form-container'>
      <form onSubmit={handleSubmit}>
        <h1 style={{marginTop: '0'}}>New Post</h1>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export { New }