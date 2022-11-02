const Footer = () => {
  const footerStyles = {
    backgroundColor: 'rgba(50, 50, 50, 1)',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    borderTop: '1px solid rgba(100, 100, 100, 1)'
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
      Made with ❤️ <a href='https://ericmtodd.herokuapp.com' target='_blank' style={linkStyles} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>Eric M. Todd</a>
    </footer>
  )
}

export default Footer