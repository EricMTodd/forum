import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Edit = ({
  domain,
  currentUser
}) => {
  const navigate = useNavigate()
  const [handle, setHandle] = useState(currentUser.handle)
  const [email, setEmail] = useState(currentUser.email)
  const [password, setPassword] = useState(currentUser.password)
  const [passwordConfirmation, setPasswordConfirmation] = useState(currentUser.password)

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
      if (response.data.successful) {
        navigate(`/users/${currentUser.id}`)
      } 
    })
    .catch(error => console.log(error))
  }

  return(
    <div className='edit-user-container'>
      <form onSubmit={handleSubmit}>
        <h1>Edit User</h1>
        <label htmlFor='edit-user-handle-input'>
          <strong>Handle</strong>
        </label>
        <br />
        <input type='text' id='edit-user-handle-input' name='handle' value={handle} onChange={e => setHandle(e.target.value)} />
        <br />
        <br />
        <label htmlFor='edit-user-email-input'>
          <strong>Email</strong>
        </label>
        <br />
        <input type='email' id='edit-user-email-input' name='email' value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <br />
        <label htmlFor='edit-user-password-input'>
          <strong>Password</strong>
        </label>
        <br />
        <input type='password' id='edit-user-password-input' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <br />
        <label htmlFor='edit-user-password-confirmation-input'>
          <strong>Password Confirmation</strong>
        </label>
        <br />
        <input type='password' id='edit-user-password-confirmation-input' name='passwordConfirmation' value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
        <br />
        <br />
        <button type='submit' className='charlie-button'>Submit</button>
      </form>
    </div>
  )
}

export { Edit }