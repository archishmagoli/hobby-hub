import '../App.css';
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from '../client';
import { getRelativeDate } from '../App';

const DetailView = () => {

    let params = useParams();
    const [post, setPost] = useState(null);
    const [upvotes, setUpvotes] = useState(0);
    const [comments, setComments] = useState([]);

    const fetchPost = async () => {
        const { data, error } = await supabase
        .from('posts')
        .select()
        .filter('id', 'eq', params.id)
        
        setPost(data[0]);
        setUpvotes(data[0].upvotes);
        setComments(data[0].comments);
    };

    useEffect(() => {
        fetchPost();
    }, [upvotes, comments]);

    
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
        databaseUpvotes(upvotes + 1);
    };

    const databaseUpvotes = async (updatedUpvotes) => {
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

    const databaseComments = async (updatedComments) => {
        try {
            const { error } = await supabase
            .from('posts')
            .update({ 
                      comments: updatedComments
                    })
            .eq('id', params.id)
        } catch (error) {
            alert('Something went wrong, please try again.');
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: name === 'comments' ? [...post.comments] : value
        });
    };

    const addComment = (e) => {
        e.preventDefault();
        setComments([...comments, e.target.elements.comments.value]);
        databaseComments([...comments, e.target.elements.comments.value]);
        e.target.elements.comments.value = '';
    }
    
    return (
        <div>
            {post !== null ? (
                <div className='postDetail' key={post.id}>
                    <p>{getRelativeDate(post.created_at)}</p>
                    <h2><b>{post.title}</b></h2>
                    <p>{post.content}</p>
                    <p>Upvotes: {post.upvotes}</p>
                    {post.image_url !== null ? 
                        <img src={post.image_url} className='image'></img> : null
                    }
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
                        🗑️
                    </button>
                    <h3>Comments</h3>
                    {post.comments !== null ? post.comments.map(comment => <p key={comment}>{comment}</p>) : null}

                    <form onSubmit={addComment}>
                        <input type="text" id="comments" name="comments" placeholder='Leave a comment...' onChange={handleChange} />
                        <input className='button button-submit' type="submit" value="Add Comment" />
                    </form>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default DetailView;