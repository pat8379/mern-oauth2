import React from 'react'
import Delete from "./components/Delete";
import { useNavigate } from 'react-router-dom'
import GetAll from "./components/GetAll";
import Post from "./components/Post";
import SpecificPlayer from './components/SpecificPlayer';


function App() {
  let navigate = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST'
      })   
      // console.log(results)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Complete results are logged in console</h2>
      <GetAll/>
      <Post/>  
      <Delete/>  
      <SpecificPlayer/>
      <br/>
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')}>Log in</button>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}

export default App;