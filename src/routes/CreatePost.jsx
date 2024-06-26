import '../App.css';
import { supabase } from '../client';
import { useState } from 'react';

const CreatePost = () => {
    const [post, setPost] = useState({
        title: null,
        content: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { data, error } = await supabase
                .from('posts')
                .insert({
                    title: post.title,
                    content: post.content,
                    image_url: post.image_url
                });
    
            if (error) {
                throw error;
            }
    
            alert('Post created successfully!', data);
            window.location = '/'
        } catch (error) {
            alert('Error creating post. Remember that your post MUST have a title.');
        }
    };

    return (
        <div>
            <h1>Create a Post!</h1>
            <form className='createPost' onSubmit={handleSubmit}>
                <label htmlFor="title">Post Title:</label>
                <input type="text" id="title" name="title" placeholder='Title (required)' onChange={handleChange} required />
                
                <br />

                <label htmlFor="content">Post Content:</label>
                <input type="text" id="content" name="content" placeholder='Content (optional)' onChange={handleChange} />

                <br />

                <label htmlFor="image_url">Post Image:</label>
                <input type="text" id="image_url" name="image_url" placeholder='Image URL (optional)' onChange={handleChange} />

                <input className='button button-submit' type="submit" value="Submit" />
            </form>
        </div>
        
    );
};
  
export default CreatePost;