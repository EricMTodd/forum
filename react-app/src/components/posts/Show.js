import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { New as NewComment } from '../comments/New'
import { Show as ShowComment } from '../comments/Show'
import { Edit as EditPost } from './Edit'

const Show = ({
  domain,
  loggedIn,
  currentUser
}) => {
  const navigate = useNavigate()
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const topLevelComments = comments.filter(comment => comment.parent_id === null)

  useEffect(() => {
    axios.get(`${domain}/posts/${params.id}`)
    .then(response => {
      if (response.data.successful) {
        setPost(response.data.post)
        setComments(response.data.comments.reverse())
      } else {
        navigate('/404')
      }
    })
    .catch(error => console.log(error))
  }, [params.id])

  const handleDestroy = () => {
    axios.delete(`${domain}/posts/${post.id}/destroy`)
    .then(response => {
      if (response.data.successful) {
        navigate('/')
      }
    })
    .catch(error => console.log(error))
  }

  return(
    <div className='show-post-container'>
      <h1>{post.title}</h1>
      <Link to={`/users/${post.user_id}`}>{post.user_handle}</Link>
      <br />
      <p>{post.body}</p>
      { loggedIn && currentUser.id === post.user_id && <button type='button'>Edit</button> }
      { loggedIn && currentUser.id === post.user_id && <EditPost domain={domain} post={post} /> }
      { loggedIn && currentUser.id === post.user_id && <button type='button' onClick={handleDestroy}>Delete</button> }
      { loggedIn && <NewComment domain={domain} currentUser={currentUser} post={post} /> }
      <ul>
        { topLevelComments.map(comment => 
          <li key={comment.id}>
            <ShowComment domain={domain} currentUser={currentUser} loggedIn={loggedIn} post={post} comments={comments} comment={comment} />
          </li>) }
      </ul>
    </div>
  )
}

export { Show }