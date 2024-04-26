import '../App.css';
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from '../client';
import { getRelativeDate } from '../App';

const DetailView = () => {

    let params = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
            .from('posts')
            .select()
            .filter('id', 'eq', params.id)
            
            setPost(data[0]);
        };

        fetchPost();
    }, []);

    
    const deletePost = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', params.id);

    
            if (error) {
                throw error;
            }
    
            alert('Successfully deleted post.')
            window.location = '/hobby-hub/'
        } catch (error) {
            alert('Error deleting post.');
        }
    };
    
    return (
        <div>
            {post !== null ? (
                <div className='postDetail' key={post.id}>
                    <p>{getRelativeDate(post.created_at)}</p>
                    <h2><b>{post.title}</b></h2>
                    <p>{post.content}</p>
                    <p>{post.upvotes} upvotes</p>
                    <br></br>
                    <Link to={"/hobby-hub/details/" + post.id + '/edit'}>
                        <button className='button button-info'>
                            Edit Post
                        </button>
                    </Link>
                    <br></br>
                    <br></br>
                    <button className='button button-danger' onClick={deletePost}>Delete Post</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default DetailView;