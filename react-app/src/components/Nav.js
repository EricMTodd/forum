import { Link } from 'react-router-dom'

const Nav = () => {
  const navStyles = {
    backgroundColor: 'black',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px 0 15px'
  }

  return(
    <nav style={navStyles}>
      <div id='navigation-links'>
        <Link to='/'>Home</Link>
      </div>
      <div id='session-links' style={{display: 'flex', gap: '5px'}}>
        <Link to='#'>Log in</Link>
        <Link to='/signup'>Sign up</Link>
      </div>
    </nav>
  )
}

export default Nav