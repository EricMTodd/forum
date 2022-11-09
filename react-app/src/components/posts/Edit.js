import { useState } from 'react'
import axios from 'axios'

const Edit = ({
  domain,
  post
}) => {
  const [body, setBody] = useState(post.body)

  const containerStyles = {
    display: 'none'
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('handleSubmit')
    axios.patch(`${domain}/posts/${post.id}/update`, {
      post: {
        body: body
      }
    })
    .then(response => {
      console.log(response.data)
      if (response.data.successful) {
        window.location.reload()
      }
    })
    .catch(error => console.log(error))
  }

  return(
    <div className='edit-post-form-container' style={containerStyles}>
      <form className='edit-post-form' onSubmit={handleSubmit}>
        <label htmlFor='edit-post-body-textarea'>
          <strong>Edit post body</strong>
        </label>
        <br />
        <textarea id='edit-post-body-textarea' name='body' value={body} onChange={e => setBody(e.target.value)} />
        <br />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export { Edit }