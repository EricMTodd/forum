import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LogIn = ({
  domain,
  logIn
}) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    axios.post(`${domain}/sessions/create`, {
      email: email,
      password: password
    })
    .then(response => {
      if (response.data.successful) {
        logIn(response.data)
        navigate('/')
      }
    })
    .catch(error => console.log(error))
  }

  return(
    <div id='log-in-form-container'>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} id='log-in-form'>
        <label htmlFor='log-in-email-input'>
          <strong>Email</strong>
        </label>
        <br />
        <input type='email' id='log-in-email-input' name='email' value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <br />
        <label htmlFor='log-in-password-input'>
          <strong>Password</strong>
        </label>
        <br />
        <input type='password' id='log-in-password-input' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <br />
        <button type='submit' className='charlie-button' >Submit</button>
      </form>
    </div>
  )
}

export default LogIn