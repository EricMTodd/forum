import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Edit = ({
  domain,
  currentUser
}) => {
  // STATE AND VARIABLES
  const navigate = useNavigate()
  const [handle, setHandle] = useState(currentUser.handle)
  const [email, setEmail] = useState(currentUser.email)
  const [password, setPassword] = useState(currentUser.password)
  const [passwordConfirmation, setPasswordConfirmation] = useState(currentUser.password)

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
    axios.patch(`${domain}/users/${currentUser.id}`, {
      user: {
        id: currentUser.id,
        handle: handle,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }
    })
    .then(response => {
      console.log(response.data)
      if (response.data.successful) {
        navigate(`/users/${currentUser.id}`)
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
    <div className='user-edit-container' style={containerStyles}>
      <form onSubmit={handleSubmit} style={formStyles}>
        <h1 style={{marginTop: '0'}}>Edit User</h1>
        <label htmlFor='edit-user-handle-input'>
          <strong>Handle</strong>
        </label>
        <br />
        <input type='text' id='edit-user-handle-input' name='handle' value={handle} onChange={e => setHandle(e.target.value)} style={inputStyles} />
        <br />
        <br />
        <label htmlFor='edit-user-email-input'>
          <strong>Email</strong>
        </label>
        <br />
        <input type='email' id='edit-user-email-input' name='email' value={email} onChange={e => setEmail(e.target.value)} style={inputStyles} />
        <br />
        <br />
        <label htmlFor='edit-user-password-input'>
          <strong>Password</strong>
        </label>
        <br />
        <input type='password' id='edit-user-password-input' name='password' value={password} onChange={e => setPassword(e.target.value)} style={inputStyles} />
        <br />
        <br />
        <label htmlFor='edit-user-password-confirmation-input'>
          <strong>Password Confirmation</strong>
        </label>
        <br />
        <input type='password' id='edit-user-password-confirmation-input' name='passwordConfirmation' value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} style={inputStyles} />
        <br />
        <br />
        <button type='submit' style={buttonStyles} onMouseEnter={buttonHoverEffect} onMouseLeave={buttonHoverEffect} onMouseDown={buttonClickEffect} onMouseUp={buttonClickEffect}>Submit</button>
      </form>
    </div>
  )
}

export { Edit }