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

  const buttonStyles = {
    backgroundColor: 'rgba(150, 150, 150, 1)',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    padding: '5px 20px 5px 20px',
    borderRadius: '25px',
    textDecoration: 'none'
  }

  const linkStyles = {
    textDecoration: 'none'
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

  const linkHoverEffect = e => {
    if (e.target.style.textDecoration !== 'underline') {
      e.target.style.textDecoration = 'underline'
    } else {
      e.target.style.textDecoration = 'none'
    }
  }

  let sessionsLinks
  if (loggedIn) {
    sessionsLinks =
    <div id='sessions-links' style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
      <Link to={`users/${currentUser.id}`} style={linkStyles} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>{currentUser.handle}</Link>
      <button type='button' onClick={logOut}style={buttonStyles} onMouseEnter={buttonHoverEffect} onMouseLeave={buttonHoverEffect} onMouseDown={buttonClickEffect} onMouseUp={buttonClickEffect}>Log out</button>
    </div>
  } else {
    sessionsLinks =
    <div id='sessions-links' style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
      <Link to='/login' style={linkStyles} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>Log in</Link>
      <Link to='/signup' style={buttonStyles} onMouseEnter={buttonHoverEffect} onMouseLeave={buttonHoverEffect} onMouseDown={buttonClickEffect} onMouseUp={buttonClickEffect}>Sign up</Link>
    </div>
  }

  return(
    <nav style={navStyles}>
      <div id='navigation-links'>
        <Link to='/' style={linkStyles} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>Home</Link>
      </div>
      {sessionsLinks}
    </nav>
  )
}

export default Nav