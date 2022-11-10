import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const Show = ({
  domain,
  loggedIn,
  currentUser,
  logOut
}) => {
  const navigate = useNavigate()
  const params = useParams()
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [password, setPassword] = useState('')
  
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column'
  }

  const postStyles = {
    backgroundColor: 'rgba(50, 50, 50, 1)',
    padding: '25px',
    margin: '15px 0 15px 0',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const toggleDestroyUserConfirmationModalButtonStyles = {
    background: 'none',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'normal'
  }

  const destroyUserConfirmationModalContainerStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'none'
  }

  const destroyUserConfirmationModalContentStyles = {
    backgroundColor: 'rgba(50, 50, 50, 1)',
    width: '20%',
    height: 'fit-content',
    padding: '50px',
    borderRadius: '15px'
  }

  useEffect(() => {
    axios.get(`${domain}/users/${params.id}`)
    .then(response => {
      if (response.data.successful) {
        setUser(response.data.user)
        setPosts(response.data.posts.reverse())
      } else {
        navigate('/404')
      }
    })
    .catch(error => console.log(error))
  }, [params.id])

  const handleDestroy = e => {
    e.preventDefault()
    axios.post(`${domain}/users/${user.id}/destroy`, {
      password: password
    })
    .then(response => {
      if (response.data.successful) {
        logOut()
      }
    })
    .catch(error => console.log(error))
  }

  const linkHoverEffect = e => {
    if (e.target.style.textDecoration !== 'underline') {
      e.target.style.textDecoration = 'underline'
    } else {
      e.target.style.textDecoration = 'none'
    }
  }

  const toggleDestroyUserConfirmationModal = () => {
    const modal = document.querySelector('.destroy-user-confirmation-modal-container')
    const cancelButton = document.querySelector('#cancel-destroy-user-button')
    const confirmButton = document.querySelector('#confirm-destroy-user-button')
    if (modal.style.display !== 'flex') {
      modal.style.display = 'flex'
      cancelButton.style.backgroundColor = 'rgba(150, 150, 150, 1)'
      cancelButton.style.color = 'black'
      confirmButton.style.backgroundColor = 'rgba(150, 150, 150, 1)'
      confirmButton.style.color = 'black'
    } else {
      modal.style.display = 'none'
    }
  }

  const confirmButtonHoverEffect = e => {
    if (e.target.style.backgroundColor !== 'red') {
      e.target.style.backgroundColor = 'red'
      e.target.style.color = 'white'
    } else {
      e.target.style.backgroundColor = 'rgba(150, 150, 150, 1)'
      e.target.style.color = 'black'
    }
  }

  const cancelButtonHoverEffect = e => {
    if (e.target.style.backgroundColor !== 'blue') {
      e.target.style.backgroundColor = 'blue'
      e.target.style.color = 'white'
    } else {
      e.target.style.backgroundColor = 'rgba(150, 150, 150, 1)'
      e.target.style.color = 'black'
    }
  }

  const buttonOnMouseDownEffect = e => {
    e.target.style.backgroundColor = 'white'
    e.target.style.color = 'black'
  }

  const confirmButtonOnMouseUpEffect = e => {
    e.target.style.backgroundColor = 'red'
    e.target.style.color = 'white'
  }

  return(
    <div className='show-user-container' style={containerStyles}>
      <div className='destroy-user-confirmation-modal-container' style={destroyUserConfirmationModalContainerStyles}>
        <div className='destroy-user-confirmation-modal-content' style={destroyUserConfirmationModalContentStyles}>
          <h1 style={{textAlign: 'center', color: 'red', marginTop: '0'}}>WARNING</h1>
          <p>
            You are about to permanently delete your account! All your posts, comments and comments on them will be destroyed as well. If you are sure you would like to do this, please enter your password.
          </p>
          <form onSubmit={handleDestroy}>
            <label htmlFor='destroy-user-confirmation-modal-password-input'>
              <strong>Password</strong>
            </label>
            <br />
            <input type='password' id='destroy-user-confirmation-modal-password-input' name='password' value={password} onChange={e => setPassword(e.target.value)} style={{width: '100%', marginBottom: '25px' }} />
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <button type='submit' id='confirm-destroy-user-button' style={{width: '33%', height: '40px', marginTop: '10px', borderRadius: '25px', backgroundColor: 'rgba(150, 150, 150, 1)', border: 'none'}} onClick={handleDestroy} onMouseEnter={confirmButtonHoverEffect} onMouseLeave={confirmButtonHoverEffect} onMouseDown={buttonOnMouseDownEffect} onMouseUp={confirmButtonOnMouseUpEffect}>Confirm</button>
              <button type='button' id='cancel-destroy-user-button' style={{width: '33%', height: '40px',marginTop: '10px', borderRadius: '25px', backgroundColor: 'rgba(150, 150, 150, 1)', border: 'none'}} onMouseEnter={cancelButtonHoverEffect} onMouseLeave={cancelButtonHoverEffect} onMouseDown={buttonOnMouseDownEffect} onMouseUp={toggleDestroyUserConfirmationModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <h1 style={{marginBottom: '0'}}>{user.handle}</h1>
      <div className='user-actions'>
        { loggedIn && currentUser.id === user.id && <Link to={`/users/${user.id}/edit`} style={{textDecoration: 'none'}} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>Edit</Link> }
        { loggedIn && currentUser.id === user.id && <button type='button' onClick={toggleDestroyUserConfirmationModal} style={toggleDestroyUserConfirmationModalButtonStyles} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>Delete</button> }
      </div>
      <h2>Posts</h2>
      <div id={`user-${user.id}-posts-container`}>
        {posts.map(post => <div key={post.id} id={`post-${post.id}`} style={postStyles}><Link to={`/posts/${post.id}`} style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '24px'}} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>{post.title}</Link></div>)}
      </div>
    </div>
  )
}

export { Show }