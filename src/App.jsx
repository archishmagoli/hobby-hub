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
  const [recentClicked, setRecentClicked] = useState(false);
  const [popularClicked, setPopularClicked] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
        let orderClause = null;

        if (recentClicked) {
          orderClause = ('created_at', {ascending: false});
        } else if (popularClicked) {
          orderClause = ('upvotes', {ascending: false});
        }

        if (searchTerm === null || searchTerm === '') {
          if (orderClause == null) {
            try {
              const { data, error } = await supabase
                  .from('posts')
                  .select('*');

              setPosts(data);
            } catch (error) {
              error = err.message;
            }
          } else {
            try {
              if (recentClicked) {
                const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', {ascending: false});
                setPosts(data);
              } else {
                const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('upvotes', {ascending: false});
                setPosts(data);
              }
            } catch (error) {
              error = err.message;
            }
          }
        } else {
          if (orderClause == null) {
            try {
              const { data, error } = await supabase
                  .from('posts')
                  .select('*')
                  .ilike('title', '%' + searchTerm + '%');

              setPosts(data);
            } catch (err) {
                error = err.message;
            }
          } else {
            try {
              if (recentClicked) {
                const { data, error } = await supabase
                .from('posts')
                .select('*')
                .ilike('title', '%' + searchTerm + '%')
                .order('created_at', {ascending: false});
                setPosts(data);
              } else {
                const { data, error } = await supabase
                .from('posts')
                .select('*')
                .ilike('title', '%' + searchTerm + '%')
                .order('upvotes', {ascending: false});
                setPosts(data);
              }
            } catch (error) {
              error = err.message;
            }
          }
        }
    };

    fetchPosts();
  }, [searchTerm, recentClicked, popularClicked]);

  const handleClick = (e) => {
    if (e.target.id === 'recent') {
      setRecentClicked(!recentClicked);
      setPopularClicked(false);
    } else {
      setRecentClicked(false);
      setPopularClicked(!popularClicked);
    }
  }

  return (
    <>
      <div>
        Sort By: 
        <button className={`button-sort-${recentClicked ? 'clicked' : 'unclicked'}`} id='recent' onClick={handleClick}>Most Recent</button>
        <button className={`button-sort-${popularClicked ? 'clicked' : 'unclicked'}`} id='popular' onClick={handleClick}>Most Popular</button>
      </div>
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
                <Link to={"/details/" + post.id}>
                  <button className='button'>
                      See More 
                  </button>
              </Link>
            </div>
        )
      }
      </div>
    </>
    
  )
}

export default App;
