import { Link } from 'react-router-dom'
import { New as NewComment } from './New'
import axios from 'axios'

const Show = ({
  domain,
  currentUser,
  loggedIn,
  post,
  comments,
  comment
}) => {
  const childComments = comments.filter(childComment => childComment.parent_id === comment.id)

  const commentStyles = {
    borderLeft: '2px solid rgba(100, 100, 100, 1)',
    paddingLeft: '5px',
    marginBottom: '30px'
  }

  const buttonStyles = {
    background: 'none',
    color: 'white',
    border: 'none'
  }

  const handleDestroy = () => {
    console.log('handleDestroy')
    axios.delete(`${domain}/comments/${comment.id}/destroy`)
    .then(response => {
      console.log(response.data)
      if (response.data.successful) {
        window.location.reload()
      }
    })
    .catch(error => console.log(error))
  }

  const toggleReplyForm = e => {
    if (e.target.nextSibling.style.display !== 'block') {
      e.target.nextSibling.style.display = 'block'
      e.target.innerText = 'Hide'
    } else {
      e.target.nextSibling.style.display = 'none'
      e.target.innerText = 'Reply'
    }
  }

  const linkHoverEffect = e => {
    if (e.target.style.textDecoration !== 'underline') {
      e.target.style.textDecoration = 'underline'
    } else {
      e.target.style.textDecoration = 'none'
    }
  }

  return(
    <div id={`comment-${comment.id}`} style={commentStyles}>
      <Link to={`/users/${comment.user_id}`} style={{textDecoration: 'none'}} onMouseOver={linkHoverEffect} onMouseLeave={linkHoverEffect}>{comment.user_handle}</Link>
      <p>{comment.body}</p>
      { loggedIn && currentUser.id === comment.user_id && <button type='button' onClick={handleDestroy} style={buttonStyles} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>Delete</button> }
      { loggedIn && <button type='button' onClick={toggleReplyForm} style={buttonStyles} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>Reply</button> }
      { loggedIn && <NewComment domain={domain} currentUser={currentUser} post={post} parentComment={comment} /> }
      <ul>
        { childComments.map(comment => 
          <li key={comment.id}>
            <Show domain={domain} currentUser={currentUser} loggedIn={loggedIn} post={post} comments={comments} comment={comment} />
          </li>
        ) }
      </ul>
    </div>
  )
}

export { Show }