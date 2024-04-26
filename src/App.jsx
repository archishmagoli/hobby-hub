import { useState, useEffect } from 'react'
import { supabase } from './client';
import './App.css'
import { useOutletContext, Link } from 'react-router-dom';
import { intlFormatDistance } from 'date-fns';

export const getRelativeDate = (given_date) => {
  const timeString = intlFormatDistance(given_date, new Date());
  return timeString;
}

function App() {
  const [searchTerm, setSearchTerm] = useOutletContext();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*');
        
        setPosts(data);
    };

    fetchPosts();
}, [])

  return (
    <div className='postHolder'>
      {
        posts === null || posts.length === 0 ?
        <div>
            <h2>No posts yet!</h2>
        </div>
        :
        posts.map(post =>
            <div key={post.id} className='post'>
                <p>{getRelativeDate(post.created_at)}</p>
                <h2><b>{post.title}</b></h2>
                <p>{post.content}</p>
                <p>{post.upvotes} upvotes</p>
                <Link to={"/hobby-hub/details/" + post.id}>
                  <button className='button'>
                      See More 
                  </button>
              </Link>
            </div>
        )
    }
    </div>
  )
}

export default App;
