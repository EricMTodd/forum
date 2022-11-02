import { useState } from 'react'
import axios from 'axios'

const New = ({
  domain,
  currentUser,
  post,
  parentComment
}) => {
  const [body, setBody] = useState('')

  const buttonStyles = {
    borderRadius: '25px',
    backgroundColor: 'rgba(150, 150, 150, 1)',
    border: 'none',
    padding: '5px 15px 5px 15px'
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('handleSubmit')
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
        console.log(response.data)
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
        console.log(response.data)
        if (response.data.successful) {
          window.location.reload()
        }
      })
      .catch(error => console.log(error))
    }
  }

  const buttonHoverEffect = e => {
    if (e.target.style.backgroundColor !== 'blue') {
      e.target.style.backgroundColor = 'blue'
      e.target.style.color = 'white'
    } else {
      e.target.style.backgroundColor = 'rgba(150, 150, 150, 1)'
      e.target.style.color = 'black'
    }
  }

  const buttonClickEffect = e => {
    if (e.target.style.backgroundColor !== 'white') {
      e.target.style.backgroundColor = 'white'
      e.target.style.color = 'black'
    } else {
      e.target.style.backgroundColor = 'blue'
      e.target.style.color = 'white'
    }
  }

  let formDisplay
  if (parentComment) {
    formDisplay = {
      display: 'none'
    }
  }

  return(
    <div className='new-comment-container' style={formDisplay}>
      <form onSubmit={handleSubmit}>
        <label htmlFor='new-comment-body-textarea'>
          <strong>Comment as {currentUser.handle}</strong>
        </label>
        <br />
        <textarea id='new-comment-body-textarea' name='body' value={body} onChange={e => setBody(e.target.value)} style={{width: '450px', height: '150px'}} />
        <br />
        <br />
        <button type='submit' style={buttonStyles} onMouseEnter={buttonHoverEffect} onMouseLeave={buttonHoverEffect} onMouseDown={buttonClickEffect} onMouseUp={buttonClickEffect}>Submit</button>
      </form>
    </div>
  )
}

export { New }