import React, { useState } from 'react';
import styles from '../styles/Login.module.css'
import { MdLock } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {
  const { dispatch } = useAuthContext();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]=useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (identifier==="" || password==="") {
      setError("Please enter all fields");
      return;
    }
    // Perform login details to backend logic
    setError("");
    const response = await fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    })
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
      });
      dispatch({ type: 'LOGIN', payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: data.error
      })
    }
    return;
  }
  return ( 
    <div>
      {error && <p>{error}</p>}
      <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label className={styles.loginLabel}>
      
      <input type='text' placeholder='Email, phone number or username' className={styles.loginInput} value={identifier} onChange={(e) => setIdentifier(e.target.value)} required/>
      </label>
      <label className={styles.loginLabel}>
      Password:
      <span className={styles.loginSpan}>
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className={styles.loginInput} required/>
      <MdLock style={{"marginLeft": "10px", "fontSize": "20px"}}/>
      </span>
      </label>  
      <button type='submit' className={styles.loginButton}>Login</button>
      </form>
    </div>
   );
}
 
export default Login;