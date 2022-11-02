import { New as NewComment } from './New'

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
    paddingLeft: '5px'
  }

  const replyButtonStyles = {
    background: 'none',
    color: 'white',
    border: 'none'
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

  const replyButtonHoverEffect = e => {
    if (e.target.style.textDecoration !== 'underline') {
      e.target.style.textDecoration = 'underline'
    } else {
      e.target.style.textDecoration = 'none'
    }
  }

  return(
    <div id={`comment-${comment.id}`} style={commentStyles}>
      <p>{comment.body}</p>
      { loggedIn && <button type='button' onClick={toggleReplyForm} style={replyButtonStyles} onMouseEnter={replyButtonHoverEffect} onMouseLeave={replyButtonHoverEffect}>Reply</button> }
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