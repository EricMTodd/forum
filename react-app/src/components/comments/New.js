import { useState } from 'react'
import axios from 'axios'

const New = ({
  domain,
  currentUser,
  post,
  parentComment
}) => {
  const [body, setBody] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (parentComment) {
      axios.post(`${domain}/comments/create`, {
        comment: {
          user_id: currentUser.id,
          user_handle: currentUser.handle,
          post_id: post.id,
          body: body,
          parent_id: parentComment.id
        }
      })
      .then(response => {
        if (response.data.successful) {
          window.location.reload()
        }
      })
      .catch(error => console.log(error))
    } else {
      axios.post(`${domain}/comments/create`, {
        comment: {
          user_id: currentUser.id,
          user_handle: currentUser.handle,
          post_id: post.id,
          body: body        }
      })
      .then(response => {
        if (response.data.successful) {
          window.location.reload()
        }
      })
      .catch(error => console.log(error))
    }
  }

  let formDisplay
  if (parentComment) {
    formDisplay = {
      display: 'none'
    }
  }

  return(
    <div className='new-comment-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='new-comment-body-textarea'>
          <strong>Comment as {currentUser.handle}</strong>
        </label>
        <br />
        <textarea id='new-comment-body-textarea' name='body' value={body} onChange={e => setBody(e.target.value)} />
        <br />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export { New }