import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Show = ({
  domain
}) => {
  const navigate = useNavigate()
  const params = useParams()
  const [post, setPost] = useState({})

  useEffect(() => {
    axios.get(`${domain}/posts/${params.id}`)
    .then(response => {
      if (response.data.successful) {
        setPost(response.data.post)
      } else {
        navigate('/404')
      }
    })
    .catch(error => console.log(error))
  }, [params.id])

  const linkHoverEffect = e => {
    if (e.target.style.textDecoration !== 'underline') {
      e.target.style.textDecoration = 'underline'
    } else {
      e.target.style.textDecoration = 'none'
    }
  }

  return(
    <div className='show-post'>
      <h1>{post.title}</h1>
      <Link to={`/users/${post.user_id}`} style={{textDecoration: 'none'}} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>{post.user_handle}</Link>
      <p>{post.body}</p>
    </div>
  )
}

export { Show }