import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }


  const loginSubmit= async(e)=>{
    e.preventDefault();
    try{
      await axios.post('/user/login',{...user})

      localStorage.setItem('firstLogin',true)

      window.location.href = '/'
    }
    catch(err){
      alert(err.response.data.msg)
    }
    
  }

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <label>Email:</label>
        <input type="email" name='email' placeholder='Enter your email' value={user.email} onChange={onchangeInput} required />
        <label>Password:</label>
        <input type="password" name='password' placeholder='password' value={user.password} onChange={onchangeInput} required />
        <div className='row'>
          <button type='submit'>Login</button>
          <Link to={'/register'}>Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login