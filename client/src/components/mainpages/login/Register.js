import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }


  const registerSubmit= async(e)=>{
    e.preventDefault();
    try{
      await axios.post('/user/register',{...user})

      localStorage.setItem('firstRegister',true)

      window.location.href = '/'
    }
    catch(err){
      alert(err.response.data.msg)
    }
    
  }

  return (
    <div className='register-page'>
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        <label>Name:</label>
        <input type="text" name='name' placeholder='Enter your name' value={user.name} onChange={onchangeInput} required />
        <label>Email:</label>
        <input type="email" name='email' placeholder='Enter your email' value={user.email} onChange={onchangeInput} required />
        <label>Password:</label>
        <input type="password" name='password' placeholder='password' value={user.password} onChange={onchangeInput} required />
        <div className='row'>
          <button type='submit'>Register</button>
          <Link to={'/login'}>Login</Link>
        </div>
      </form>
      
    </div>
  )
}

export default Register