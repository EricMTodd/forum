import { useState } from 'react'
import axios from 'axios'

const SignUp = ({
  domain
}) => {
  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log('handleSubmit')
    axios.post(`${domain}/users/create`, {
      user: {
        handle: handle,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => console.log(error))
  }

  return(
    <div id='sign-up-form-container'>
      <form onSubmit={handleSubmit}>
        <h1 style={{marginTop: '0'}}>Sign up</h1>
        <label htmlFor='sign-up-handle-input'>
          <strong>Handle</strong>
        </label>
        <br />
        <input type='text' id='sign-up-handle-input' name='handle' value={handle} onChange={e => setHandle(e.target.value)} />
        <br />
        <br />
        <label htmlFor='sign-up-email-input'>
          <strong>Email</strong>
        </label>
        <br />
        <input type='email' id='sign-up-email-input' name='email' value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <br />
        <label htmlFor='sign-up-password-input'>
          <strong>Password</strong>
        </label>
        <br />
        <input type='password' id='sign-up-password-input' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <br />
        <label htmlFor='sign-up-password-confirmation-input'>
          <strong>Password confirmation</strong>
        </label>
        <br />
        <input type='password' id='sign-up-password-confirmation-input' name='passwordConfirmation' value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
        <br />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignUp