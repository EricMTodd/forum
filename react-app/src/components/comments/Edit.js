import { useState } from 'react'
import axios from 'axios'

const Edit = ({
  domain,
  comment
}) => {
  const [body, setBody] = useState(comment.body)

  const handleSubmit = e => {
    e.preventDefault()
    axios.patch(`${domain}/comments/${comment.id}/update`, {
      comment: {
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
    <div className='edit-comment-form-container' >
      <form onSubmit={handleSubmit}>
        <label htmlFor={`edit-comment-${comment.id}-body-textarea`}>
          <strong>Edit comment body</strong>
        </label>
        <br />
        <textarea id={`edit-comment-${comment.id}-body-textarea`} className='edit-comment-body-textarea' name='body' value={body} onChange={e => setBody(e.target.value)} />
        <br />
        <br />
        <button type='submit' className='alpha-button'>Submit</button>
      </form>
    </div>
  )
}

export { Edit }