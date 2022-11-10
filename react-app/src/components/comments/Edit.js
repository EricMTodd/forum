import { useState } from 'react'
import axios from 'axios'

const Edit = ({
  domain,
  comment
}) => {
  const [body, setBody] = useState(comment.body)

  const containerStyles = {
    display: 'none'
  }

  const textAreaStyles = {
    width: '450px',
    height: '150px',
    backgroundColor: 'rgba(100, 100, 100, 1)',
    borderRadius: '5px',
    border: '1px solid rgba(150, 150, 150, 1)'
  }

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
    <div id='edit-comment-form-container' style={containerStyles}>
      <form onSubmit={handleSubmit}>
        <label htmlFor='edit-comment-body-textarea'>
          <strong>Edit comment body</strong>
        </label>
        <br />
        <textarea id='edit-comment-body-textarea' name='body' value={body} onChange={e => setBody(e.target.value)} style={textAreaStyles} />
        <br />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export { Edit }