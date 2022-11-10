import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = ({
  domain,
  logIn
}) => {
  // STATE AND VARIABLES
  const navigate = useNavigate()
  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  // STYLES
  const containerStyles = {
    display: 'flex',
    height: '100%',
    justifyContent: 'center'
  }

  const formStyles = {
    backgroundColor: 'rgba(50, 50, 50, 1)',
    marginTop: '50px',
    width: '40%',
    padding: '50px',
    height: 'fit-content',
    borderRadius: '15px'
  }

  const inputStyles = {
    borderRadius: '5px',
    width: '100%',
    height: '25px',
    backgroundColor: 'rgba(100, 100, 100, 1)',
    border: '1px solid rgba(150, 150, 150, 1)'
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
    if (!password || !passwordConfirmation) {
      return
    } else {
      axios.post(`${domain}/users/create`, {
        user: {
          handle: handle,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation
        }
      })
      .then(response => {
        logIn(response.data)
        if (response.data.successful) {
          navigate('/')
        }
      })
      .catch(error => console.log(error))
    }
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
    <div id='sign-up-form-container' style={containerStyles}>
      <form onSubmit={handleSubmit} style={formStyles}>
        <h1 style={{marginTop: '0'}}>Sign up</h1>
        <label htmlFor='sign-up-handle-input'>
          <strong>Handle</strong>
        </label>
        <br />
        <input type='text' id='sign-up-handle-input' name='handle' value={handle} onChange={e => setHandle(e.target.value)} style={inputStyles} />
        <br />
        <br />
        <label htmlFor='sign-up-email-input'>
          <strong>Email</strong>
        </label>
        <br />
        <input type='email' id='sign-up-email-input' name='email' value={email} onChange={e => setEmail(e.target.value)} style={inputStyles} />
        <br />
        <br />
        <label htmlFor='sign-up-password-input'>
          <strong>Password</strong>
        </label>
        <br />
        <input type='password' id='sign-up-password-input' name='password' value={password} onChange={e => setPassword(e.target.value)} style={inputStyles} />
        <br />
        <br />
        <label htmlFor='sign-up-password-confirmation-input'>
          <strong>Password confirmation</strong>
        </label>
        <br />
        <input type='password' id='sign-up-password-confirmation-input' name='passwordConfirmation' value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} style={inputStyles} />
        <br />
        <br />
        <button type='submit' style={buttonStyles} onMouseEnter={buttonHoverEffect} onMouseLeave={buttonHoverEffect} onMouseDown={buttonClickEffect} onMouseUp={buttonClickEffect}>Submit</button>
      </form>
    </div>
  )
}

export default SignUp