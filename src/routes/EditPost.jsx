import '../App.css';
import { supabase } from '../client';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditPost = () => {
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
    }, [])

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
            const { error } = await supabase
            .from('posts')
            .update({ name: post.name,
                      title: post.title,
                      content: post.content,
                      image_url: post.image_url
                    })
            .eq('id', params.id)
    
            if (error) {
                throw error;
            }
    
            alert('Post updated successfully!');
            window.location = '/'
        } catch (error) {
            alert('Error updating post.');
        }
    };

    return (
        <div>
            { post === null ? <p>Loading...</p> :
            <div className="editPost">
                <h1>Edit Your Post</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor="title">Post Title:</label>
                    <input type="text" id="title" name="title" value={post.title} onChange={handleChange} />
                    <br />
                    <label htmlFor="content">Post Content:</label>
                    <input type="text" id="content" name="content" value={post.content} onChange={handleChange} />
                    <br />
                    <label htmlFor="image_url">Post Image:</label>
                    <input type="text" id="image_url" name="image_url" value={post.image_url || ''} placeholder='Image URL (optional)' onChange={handleChange} />
                    <br />
                    <input className='button button-submit' type="submit" value="Submit" />
                </form>
            </div>
            }
        </div>
        
    );
};
  
export default EditPost;