import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const New = ({
  domain,
  currentUser
}) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] =useState('')

  const handleSubmit = e => {
    e.preventDefault()
    axios.post(`${domain}/posts/create`, {
      post: {
        user_handle: currentUser.handle,
        user_id: currentUser.id,
        title: title,
        body: body
      }
    })
    .then(response => {
      if (response.data.successful) {
        navigate(`/posts/${response.data.post.id}`)
      }
    })
    .catch(error => console.log(error))
  }

  return(
    <div id='new-post-form-container'>
      <form onSubmit={handleSubmit}>
        <h1>New Post</h1>
        <label htmlFor='new-post-title-input'>
          <strong>Title</strong>
        </label>
        <br />
        <input type='text' id='new-post-title-input' name='title' value={title} onChange={e => setTitle(e.target.value)} />
        <br />
        <br />
        <label htmlFor='new-post-body-textarea'>
          <strong>Body</strong>
        </label>
        <br />
        <textarea id='new-post-body-textarea' name='body' value={body} onChange={e => setBody(e.target.value)} />
        <br />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export { New }