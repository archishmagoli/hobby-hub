import '../App.css';
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from '../client';
import { getRelativeDate } from '../App';

const DetailView = () => {

    let params = useParams();
    const [post, setPost] = useState(null);
    const [upvotes, setUpvotes] = useState(0);

    const fetchPost = async () => {
        const { data, error } = await supabase
        .from('posts')
        .select()
        .filter('id', 'eq', params.id)
        
        setPost(data[0]);
        setUpvotes(data[0].upvotes);
    };

    useEffect(() => {
        fetchPost();
    }, [upvotes]);

    
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

    const increaseUpvote = (e) => {
        e.preventDefault();
        setUpvotes(upvotes + 1);
        updateDatabase(upvotes + 1);
    };

    const updateDatabase = async (updatedUpvotes) => {
        try {
            const { error } = await supabase
            .from('posts')
            .update({ 
                      upvotes: updatedUpvotes
                    })
            .eq('id', params.id)
        } catch (error) {
            alert('Something went wrong, please try again.');
        }
    }
    
    return (
        <div>
            {post !== null ? (
                <div className='postDetail' key={post.id}>
                    <p>{getRelativeDate(post.created_at)}</p>
                    <h2><b>{post.title}</b></h2>
                    <p>{post.content}</p>
                    <p>{post.upvotes} upvotes</p>
                    <img src={post.image_url} className='image'></img>
                    <br></br>
                    <br></br>
                    <button className='button' onClick={increaseUpvote}>
                        👍
                    </button>
                    <Link to={"/hobby-hub/details/" + post.id + '/edit'}>
                        <button className='button button-info'>
                            ✍️
                        </button>
                    </Link>
                    <button className='button button-danger' 
                        onClick={deletePost}>
                        🗑️</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default DetailView;