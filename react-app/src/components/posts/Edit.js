import { useState } from 'react'
import axios from 'axios'

const Edit = ({
  domain,
  post
}) => {
  const [body, setBody] = useState(post.body)

  const handleSubmit = e => {
    e.preventDefault()
    axios.patch(`${domain}/posts/${post.id}/update`, {
      post: {
        body: body
      }
    })
    .then(response => {
      if (response.data.successful) {
        window.location.reload()
      }
    })
    .catch(error => console.log(error))
  }

  return(
    <div className='edit-post-form-container'>
      <form className='edit-post-form'>
        <label htmlFor='edit-post-body-textarea'>
          <strong>Edit post body</strong>
        </label>
        <br />
        <textarea id='edit-post-body-textarea' name='body' value={body} onChange={e => setBody(e.target.value)} />
        <br />
        <br />
        <button type='submit' className='alpha-button'>Submit</button>
      </form>
    </div>
  )
}

export { Edit }