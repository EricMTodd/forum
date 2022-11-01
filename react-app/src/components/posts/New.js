import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const New = ({
  domain,
  currentUser
}) => {
  // STATE AND VARIABLES
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] =useState('')

  // STYLES
  const containerStyles = {
    display: 'flex',
    height: '100%',
    justifyContent: 'center'
  }

  const formStyles = {
    backgroundColor: 'rgba(100, 100, 100, 1)',
    marginTop: '50px',
    width: '40%',
    padding: '50px',
    height: 'fit-content',
    borderRadius: '15px'
  }

  const inputStyles = {
    borderRadius: '5px',
    width: '100%',
    height: '25px'
  }

  const buttonStyles = {
    width: '101.5%',
    height: '40px',
    marginTop: '10px',
    borderRadius: '25px',
    backgroundColor: 'rgba(150, 150, 150, 1)',
    border: 'none'
  }

  // METHODS
  const handleSubmit = e => {
    e.preventDefault()
    console.log('handleSubmit')
    axios.post(`${domain}/posts/create`, {
      post: {
        author_id: currentUser.id,
        title: title,
        body: body
      }
    })
    .then(response => {
      navigate('/')
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
    <div id='new-post-form-container' style={containerStyles}>
      <form onSubmit={handleSubmit} style={formStyles}>
        <h1 style={{marginTop: '0'}}>New Post</h1>
        <label htmlFor='new-post-title-input'>
          <strong>Title</strong>
        </label>
        <br />
        <input type='text' id='new-post-title-input' name='title' value={title} onChange={e => setTitle(e.target.value)} style={inputStyles} />
        <br />
        <br />
        <label htmlFor='new-post-body-textarea'>
          <strong>Body</strong>
        </label>
        <br />
        <textarea id='new-post-body-textarea' name='body' value={body} onChange={e => setBody(e.target.value)} style={{width: '100%', height: '150px'}} />
        <br />
        <br />
        <button type='submit' style={buttonStyles} onMouseEnter={buttonHoverEffect} onMouseLeave={buttonHoverEffect} onMouseDown={buttonClickEffect} onMouseUp={buttonClickEffect}>Submit</button>
      </form>
    </div>
  )
}

export { New }