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

  const buttonStyles = {
    borderRadius: '25px',
    backgroundColor: 'rgba(150, 150, 150, 1)',
    border: 'none',
    padding: '5px 15px 5px 15px',
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

  return(
    <div className='edit-post-form-container' style={containerStyles}>
      <form className='edit-post-form' onSubmit={handleSubmit}>
        <label htmlFor='edit-post-body-textarea'>
          <strong>Edit post body</strong>
        </label>
        <br />
        <textarea id='edit-post-body-textarea' name='body' value={body} onChange={e => setBody(e.target.value)} style={textAreaStyles} />
        <br />
        <br />
        <button type='submit' style={buttonStyles} onMouseEnter={buttonHoverEffect} onMouseLeave={buttonHoverEffect} onMouseDown={buttonClickEffect} onMouseUp={buttonClickEffect}>Submit</button>
      </form>
    </div>
  )
}

export { Edit }