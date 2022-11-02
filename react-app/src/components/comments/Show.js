const Show = ({
  comments,
  parentComment
}) => {
  const childComments = comments.filter(childComment => childComment.comment_id === parentComment.id)

  const commentStyles = {
    borderLeft: '2px solid rgba(100, 100, 100, 1)',
    paddingLeft: '5px'
  }

  return(
    <div id={`comment-${parentComment.id}`}>
      <p style={commentStyles}>{parentComment.body}</p>
      <ul>
        { childComments.map(childComment => <li key={childComment.id}><Show comments={comments} parentComment={childComment} /></li>) }
      </ul>
    </div>
  )
}

export { Show }