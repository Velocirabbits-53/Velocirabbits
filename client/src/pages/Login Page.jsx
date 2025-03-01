import { useRef, useState } from 'react'
import '../App.css'

function Login() {
// setting the email/passRefs as useRef. 
  const emailRef = useRef();
  const passwordRef = useRef();
  
  function loginRequest (){
    // the buttonclick invokes this function
    const email = emailRef.current.value
    const password = passwordRef.current.value
    console.log(email)
    console.log(password)
    //
  }

  return (
    <>
     <h1>Log In</h1>
      <div1 className='inputs'>email
      <input type="text" ref={emailRef}/> 
      </div1>
      <div1 className='inputs'> Password
      <input type="password" ref = {passwordRef}/> 
      </div1>
      <div className="card">
        {/* onclick, this should update the refsand  */}
        <button onClick={loginRequest}>
          Login
        </button>
        <p>
          Register
        </p>
      </div>
    </>
  )
}

export default Login
