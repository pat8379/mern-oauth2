import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Register() {
  let navigate = useNavigate();
  const [name,setName] = useState()
  const [password, setPassword] = useState()
  const [errMsg, setErrMsg] = useState()


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (name && password) {
      setErrMsg("Loading")
      try {
        const body = {
          username: name,
          password: password.toString()
        }
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
        
        const results = await response.json()
        if (results.message) {
          setErrMsg('Username already exists')
          return
        }

        const results1 = await fetch('/api/users/login', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })

        if (results1.status !== 200) {
          setErrMsg('User not found or incorrect password')
          return
        }
        // console.log(results)
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    } else {
      setErrMsg('Fill in both fields')
    }
    
  }

  return (
    <div>
      <input placeholder='name' value={name} required onChange={(e) => setName(e.target.value)}/>
      <input placeholder='password' value={password} required onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={handleSubmit}>Register</button>
      {errMsg && <p>{errMsg}</p>}
    </div>
  )
}

export default Register