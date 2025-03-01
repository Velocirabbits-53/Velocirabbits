import { useRef, useState } from 'react'
import '../App.css'

function Login() {
// setting the username/passRefs as useRef. 
  const usernameRef = useRef();
  const passwordRef = useRef();
  
async  function loginRequest (){
    // the buttonclick invokes this function
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    console.log(username)
    console.log(password)
    try{
      console.log("hello Anthony")
   const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: username, password: password})
    });
    console.log('The value of response.body is',response)
    if (response.ok){
      console.log('You are logged in')
      // the line below is currently refreshing the page. we can test a redirect with another page once we have one, but it currently isn't correct.
      window.location.href = '/' //put page structure for Dashboard/Homepage here.
    } else {
      const error = await response.json();
      console.error('Login failed', error);
      alert('Login failed' + (error.message|| 'Invalid login information.'))
    }
  }catch(error){
    console.error(error);
  }

  }

  return (
    <>
     <h1>Log In</h1>
      <div className='inputs'>Username
      <input type="text" ref={usernameRef}/> 
      </div>
      <div className='inputs'> Password
      <input type="password" ref = {passwordRef}/> 
      </div>
      <div className="card">
        {/* onclick, this should update the refsand  */}
        <button onClick={loginRequest}>
          Login
        </button>
        <form>
          {/* this code isn't currently working. Will need to update */}
          <a href = './Register'> Register </a>
        </form>
      </div>
    </>
  )
}

export default Login
