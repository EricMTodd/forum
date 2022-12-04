import { Link } from 'react-router-dom'

const Nav = ({
  loggedIn,
  currentUser,
  logOut
}) => {

  let sessionsLinks
  if (loggedIn) {
    sessionsLinks =
    <div id='sessions-links'>
      <Link to={`users/${currentUser.id}`}>{currentUser.handle}</Link>
      <button type='button' onClick={logOut}>Log out</button>
    </div>
  } else {
    sessionsLinks =
    <div id='sessions-links'>
      <Link to='/login'>Log in</Link>
      <Link to='/signup' className='alpha-button'>Sign up</Link>
    </div>
  }

  return(
    <nav>
      <div id='navigation-links'>
        <Link to='/'>Home</Link>
      </div>
      {sessionsLinks}
    </nav>
  )
}

export default Nav