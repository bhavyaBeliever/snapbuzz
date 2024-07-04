import React, { useEffect, useState } from 'react';
import style from '../styles/Profile.module.css';
import { useParams } from 'react-router-dom';
const Profile = () => {
  const [error, setError]=useState("");
  const [user, setUser] = useState({});
  const username=useParams().username;
  useEffect(() => {

    const fetchUser = async () => {
      
      const response = await fetch('users/getUserInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        setError(message);
        return;
      }
      const data = await response.json();
      console.log(data);
      setUser(data);

      
    };
    
    fetchUser();
    
  }, []);

  console.log(user.posts);
  return ( 
    <div className={style.body}>
      <p> {user.username}</p>
      <p>{user.firstName} {user.lastName}</p>

      <p>{user.bio}</p>
      <div className={style.posts}>
        {user.posts && user.posts.map((post, index) => (
          <div key={index} className={style.post}>
            <h3>{post.title}</h3>
            <img src={post.photos[0]} alt={post.title} className={style.image}/>
          </div>
        ))}
      </div>    

    </div>
   );
};
 
export default Profile;