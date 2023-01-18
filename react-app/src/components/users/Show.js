import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

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

  const toggleDestroyUserConfirmationForm = () => {
    const modal = document.querySelector('#destroy-user-confirmation-modal-container')
    if (modal.style.display !== 'flex') {
      modal.style.display = 'flex'
    } else {
      modal.style.display = 'none'
    }
  }

  return(
    <div className='show-user-container'>
      <div id='destroy-user-confirmation-modal-container'>
        <div id='destroy-user-confirmation-modal-content'>
          <h1>WARNING</h1>
          <p>
            You are about to permanently delete your account! All your posts, comments and comments on them will be destroyed as well. If you are sure you would like to do this, please enter your password.
          </p>
          <form onSubmit={handleDestroy}>
            <label htmlFor='destroy-user-confirmation-modal-password-input'>
              <strong>Password</strong>
            </label>
            <br />
            <input type='password' id='destroy-user-confirmation-modal-password-input' name='password' value={password}  onChange={e => setPassword(e.target.value)} />
            <div id='destroy-user-buttons-container'>
              <button type='button' id='cancel-destroy-user-button' onClick={toggleDestroyUserConfirmationForm}>Cancel</button>
              <button type='submit' id='confirm-destroy-user-button' onClick={handleDestroy}>Confirm</button>
            </div>
          </form>
        </div>
      </div>
      <h1>{user.handle}</h1>
      <div className='user-actions'>
        { loggedIn && currentUser.id === user.id && <Link to={`/users/${user.id}/edit`}>Edit</Link> }
        { loggedIn && currentUser.id === user.id && <button type='button' className='bravo-button' onClick={toggleDestroyUserConfirmationForm}>Delete</button> }
      </div>
      <h2>Posts</h2>
      <div id={`user-${user.id}-posts-container`} className='user-posts-container'>
        {posts.map(post => <div key={post.id} id={`post-${post.id}`} className='posts-index-card'><Link to={`/posts/${post.id}`}>{post.title}</Link></div>)}
      </div>
    </div>
  )
}

export { Show }