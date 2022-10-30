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

  let sessionsLinks
  if (loggedIn) {
    sessionsLinks =
    <div id='sessions-links' style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
      <Link to={`users/${currentUser.id}`}>{currentUser.handle}</Link>
      <button type='button' onClick={logOut}style={buttonStyles} onMouseEnter={buttonHoverEffect} onMouseLeave={buttonHoverEffect} onMouseDown={buttonClickEffect} onMouseUp={buttonClickEffect}>Log out</button>
    </div>
  } else {
    sessionsLinks =
    <div id='sessions-links' style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
      <Link to='/login'>Log in</Link>
      <Link to='/signup' style={buttonStyles} onMouseEnter={buttonHoverEffect} onMouseLeave={buttonHoverEffect} onMouseDown={buttonClickEffect} onMouseUp={buttonClickEffect}>Sign up</Link>
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