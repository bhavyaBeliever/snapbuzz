import React, { useEffect, useState } from 'react';
import { MdLock, MdCheck } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";
import style from '../styles/Signup.module.css';
import Swal from 'sweetalert2';
import { useAuthContext } from '../hooks/useAuthContext';

const SignUp = () => {
  const { dispatch } = useAuthContext();
  const [usernameList, setUsernameList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState("");
  useEffect(() => {
    fetch('/users/getUsersInfo')
      .then(response => response.json())
      .then(data => {
        setUsernameList(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validPassword) {
      setError("Passwords do not match");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid Email Address");
      return;
    }
    if (isNaN(Number(phone)) || phone.trim() === '') {
      setError("Invalid Phone Number");
      return;
    }
    if (!validUsername) {

      setError("Username already exists");
      return;
    }
    setIsLoading(true);
    // Perform signup details to backend logic
    const response = await fetch('/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, phone, username, password })
    });
    setIsLoading(false);
    const json = await response.json();
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Sign Up Successful!',
      })

      setError("");
      dispatch({ type: 'LOGIN', payload: json });
    } else {
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: json.error,
      })
      setError(json.error);
    }
  };

  const checkUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
    if (usernameList.includes(e.target.value)) {
      setValidUsername(false);
    }
    else {
      setValidUsername(true);
    }
  }

  const checkPassword = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setValidPassword(false);
    }
    else {
      setValidPassword(true);
    }
  }
  return (
    <div className={style.body}>
      <form onSubmit={handleSubmit} method='post' className={style.signupForm}>
        <h1>Sign Up</h1>
        {error && <p>{error}</p>}
        <label className={style.signupLabel}>
          First Name:
          <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={style.signupInput} required />
        </label>

        <label className={style.signupLabel}>
          Last Name:
          <input type="text" name="lastName" value={lastName} onChange={(e) => { setLastName(e.target.value) }} className={style.signupInput}required />
        </label>

        <label className={style.signupLabel}>
          Email:
          <input type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className={style.signupInput} required />
        </label>

        <label className={style.signupLabel}>
          Phone Number:
          <input type="tel" name="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} className={style.signupInput} required />
        </label>

        <label className={style.signupLabel}>

          Username:
          <span className={style.signupSpan}>
            <input type="text" name="username" value={username} onChange={checkUsername} className={style.signupInput} required />

            {
              validUsername ? 
              <MdCheck style={{ marginLeft: "10px", fontSize: "20px" }} /> : 
              <RxCross2 style={{ marginLeft: "10px", fontSize: "20px" }} />
            }
          </span>
        </label>
        <label className={style.signupLabel}>
          Password:
          <span className={style.signupSpan}>
            <input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className={style.signupInput} required />
            <MdLock style={{ marginLeft: "10px", fontSize: "20px" }} /> 
          </span>
        </label>
        <label className={style.signupLabel}>
          Confirm Password:
          <span className={style.signupSpan}>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={checkPassword} className={style.signupInput} required />
            {
              validPassword ? 
              <MdCheck style={{ marginLeft: "10px", fontSize: "20px" }} /> : 
              <RxCross2 style={{ marginLeft: "10px", fontSize: "20px" }} />
            }
          </span>
        </label>
        <button type="submit" className={style.signupButton} >{isLoading ? "Loading..." : "Sign Up"}</button>
      </form>
    </div>
  );
}

export default SignUp; 