import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import '../App.css'; 

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setTitle(res.data.title);
        setBody(res.data.body);
      } catch (err) {
        setError('Could not find the post or you do not have permission to edit it.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await API.put(`/posts/${id}`, { title, body });
      navigate(`/posts/${id}`); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading post data...</p>
      </div>
    );
  }

  return (
    <div className="home-content-fade-in">
      <div className="contact-page-wrapper">
        <div className="contact-card">
          <header className="section-header">
            <h2>Edit Your Post</h2>
            <p>Update your content while keeping things clean and simple.</p>
          </header>

          {error ? (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p className="error-text">{error}</p>
              <button 
                className="submit-btn" 
                style={{ background: '#7fbf9b', marginTop: '15px' }} 
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="contact-form" style={{ marginTop: '20px' }}>
              
              <div className="form-input-group">
                <label>Post Title</label>
                <input 
                  type="text"
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="Enter your title..." 
                  required 
                />
              </div>

              <div className="form-input-group" style={{ alignItems: 'flex-start' }}>
                <label style={{ marginTop: '10px' }}>Content</label>
                <textarea 
                  value={body} 
                  onChange={e => setBody(e.target.value)} 
                  placeholder="Update your story..." 
                  rows={12} 
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px' }}>
                <button type="submit" className="submit-btn">Save Changes</button>
                <button 
                  type="button" 
                  className="submit-btn" 
                  style={{ background: '#7fbf9b' }} 
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;