import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const userPosts = await axios.get('http://localhost:8000/api/commands');
      console.log(userPosts);
      // setPosts(userPosts.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const cleanDb = async () => {
    await axios.get('http://localhost:8000/api/commands/clean');
  };

  useEffect(() => {
    getPosts();
    cleanDb();
    const interval = setInterval(() => {
      getPosts();
      cleanDb();
    }, 3000);

    return () => clearInterval(interval);
  }, []); // includes empty dependency array
  return (
    <div>
      <h1>useEffect</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default App;
