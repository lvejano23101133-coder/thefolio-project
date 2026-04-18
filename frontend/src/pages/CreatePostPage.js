import React, { useState, useEffect, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import '../App.css'; 

const CreatePostPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Update form on user change
  useEffect(() => {}, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (title.length > 100) {
      setError('Title must be under 100 chars');
      return;
    }
    if (body.length < 10) {
      setError('Body must be at least 10 chars');
      return;
    }
    if (body.length > 5000) {
      setError('Body must be under 5000 chars');
      return;
    }

    setLoading(true);
    setError('');

    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);

    try {
      const { data } = await API.post('/posts', fd);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh'}}>
        <div>Please log in to create posts</div>
      </div>
    );
  }

  return (
    <div className="page-wrapper home-content-fade-in">
      <div className="max-width-container">
        
        <section className="settings-card">
          <h1 className="section-title">Create New Post</h1>
          <p>Create your artistic story for TheFolio gallery</p>

          {error && (
            <div className="msg-banner error">
              <p>{error}</p>
              <button onClick={() => setError('')} className="close-btn">&times;</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-stack">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input 
                id="title"
                type="text"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Craft a captivating title (max 100 chars)..."
                maxLength={100}
                required 
              />
              <small>{title.length}/100</small>
            </div>

            <div className="form-group">
              <label htmlFor="body">Content *</label>
              <textarea 
                id="body"
                value={body} 
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your story, aesthetic insights, or artistic journey..."
                rows={12}
                maxLength={5000}
                required 
              />
              <small>{body.length}/5000</small>
            </div>

            <div className="form-group">
              <label htmlFor="image">Cover Image</label>
              <input 
                ref={fileInputRef}
                id="image"
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                disabled={loading}
              />
              {preview && (
                <div className="preview-container">
                  <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>Image Preview:</p>
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="preview-image"
                  />
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="submit-btn primary"
              disabled={loading}
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </form>
        </section>

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Publishing your masterpiece...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostPage;

