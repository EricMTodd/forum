import { Link } from 'react-router-dom'

const Index = ({
  loggedIn
}) => {

  return(
    <div id='posts-index'>
      <h1 style={{marginTop: '0'}}>Posts Index</h1>
      {loggedIn && <Link to='posts/new'>New Post</Link>}
    </div>
  )
}

export { Index }