import { Link } from 'react-router-dom'

const Nav = ({
  loggedIn,
  currentUser,
  logOut
}) => {
  const navStyles = {
    backgroundColor: 'black',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px 0 15px'
  }

  let sessionsLinks
  if (loggedIn) {
    sessionsLinks =
    <div id='sessions-links' style={{display: 'flex', gap: '5px'}}>
      <Link to={`users/${currentUser.id}`}>{currentUser.handle}</Link>
      <Link to='#' onClick={logOut}>Log out</Link>
    </div>
  } else {
    sessionsLinks =
    <div id='sessions-links' style={{display: 'flex', gap: '5px'}}>
      <Link to='/login'>Log in</Link>
      <Link to='/signup'>Sign up</Link>
    </div>
  }

  return(
    <nav style={navStyles}>
      <div id='navigation-links'>
        <Link to='/'>Home</Link>
      </div>
      {sessionsLinks}
    </nav>
  )
}

export default Nav