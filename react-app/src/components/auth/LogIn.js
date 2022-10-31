import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LogIn = ({
  domain,
  logIn
}) => {
  // STATE AND VARIABLES
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // STYLES
  const containerStyles = {
    display: 'flex',
    height: '100%',
    justifyContent: 'center'
  }

  const formStyles = {
    backgroundColor: 'rgba(100, 100, 100, 1)',
    marginTop: '50px',
    width: '40%',
    padding: '50px',
    height: 'fit-content',
    borderRadius: '15px'
  }

  const inputStyles = {
    borderRadius: '5px',
    width: '100%',
    height: '25px'
  }

  const buttonStyles = {
    width: '101.5%',
    height: '40px',
    marginTop: '10px',
    borderRadius: '25px',
    backgroundColor: 'rgba(150, 150, 150, 1)',
    border: 'none'
  }

  // METHODS
  const handleSubmit = e => {
    e.preventDefault()
    axios.post(`${domain}/sessions/create`, {
      email: email,
      password: password
    })
    .then(response => {
      logIn(response.data)
      if (response.data.logged_in) {
        navigate('/')
      }
    })
    .catch(error => console.log(error))
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

  return(
    <div id='log-in-form-container' style={containerStyles}>
      <form onSubmit={handleSubmit} style={formStyles}>
        <h1 style={{marginTop: '0'}}>Log in</h1>
        <label htmlFor='log-in-email-input'>
          <strong>Email</strong>
        </label>
        <br />
        <input type='email' id='log-in-email-input' name='email' value={email} onChange={e => setEmail(e.target.value)} style={inputStyles} />
        <br />
        <br />
        <label htmlFor='log-in-password-input'>
          <strong>Password</strong>
        </label>
        <br />
        <input type='password' id='log-in-password-input' name='password' value={password} onChange={e => setPassword(e.target.value)} style={inputStyles} />
        <br />
        <br />
        <button type='submit' style={buttonStyles} onMouseEnter={buttonHoverEffect} onMouseLeave={buttonHoverEffect} onMouseDown={buttonClickEffect} onMouseUp={buttonClickEffect}>Submit</button>
      </form>
    </div>
  )
}

export default LogIn