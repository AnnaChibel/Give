import React,{ useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Post from './components/Post';
import './styles/App.css';
import GroupTab from './components/GroupTab';


async function getPostData () {
      try {
        const res = await fetch('http://localhost:5002/api/seed');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();  //
      } catch (err) {
        console.error('Failed to load poll:', err);
        throw new Error('Failed to load post data'); // Return error message for debugging
      }
    };

// npm install react-router-dom

function App() {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostData().then((data) => {
      setPostData(data);
  }).catch((error) => {
      console.error("Error fetching post data:", error);
    }).finally(() => {
      console.log("Post data fetch completed");
      setLoading(false);
    });
  }, []);

  if (loading || !postData) return <p>Loading...</p>;

  // return (
  //   <div className="App flex">
  //     {/* left column */}
  //     <GroupTab />

  //     {/* middle column */}
  //     <div className="flex-1 p-4">

  //       <main>
  //         <PollBox initialOptions={options} />
  //       </main>
  //     </div>
  //   </div>
  // );



  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </header>
      
      <div className="App flex">
      {/* left column */}
      <GroupTab />
      <div>

      {/* middle column */}
        {postData.posts && postData.posts.length > 0 ? (
          postData.posts.map((post) => (
            <Post
              key={post.id}
              user={postData.users?.find(u => u.id === post.userId)}
              group={postData.groups?.find(g => g.id === post.groupId)}
              post={post}
              pollOptions={postData.pollOptions?.filter(opt => opt.postId === post.id)}
            />
          ))
        ) : (
          <p>No posts available.</p>
        )}

      </div>
    </div>
    </div>
  );

}
export default App;