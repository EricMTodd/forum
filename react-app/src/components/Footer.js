const Footer = () => {
  const footerStyles = {
    backgroundColor: 'black',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px'
  }

  const linkStyles = {
    textDecoration: 'none'
  }

  const linkHoverEffect = e => {
    if (e.target.style.textDecoration !== 'underline') {
      e.target.style.textDecoration = 'underline'
    } else {
      e.target.style.textDecoration = 'none'
    }
  }

  return(
    <footer style={footerStyles}>
      Made with ❤️ <a href='https://ericmtodd.herokuapp.com' style={linkStyles} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>Eric M. Todd</a>
    </footer>
  )
}

export default Footer