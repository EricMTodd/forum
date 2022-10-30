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
    console.log('handleSubmit')
    axios.post(`${domain}/sessions/create`, {
      email: email,
      password: password
    })
    .then(response => {
      console.log(response.data)
      logIn(response.data)
      navigate('/')
    })
    .catch(error => console.log(error))
  }

  return(
    <div id='log-in'>
      <form onSubmit={handleSubmit}>
        <h1 style={{marginTop: '0'}}>Log in</h1>
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
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default LogIn