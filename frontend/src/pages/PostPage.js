import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import '../App.css'; 

const PostPage = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching post:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p className="loading-text">Opening canvas...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="home-content-fade-in">
        <div className="contact-page-wrapper">
          <div className="contact-card">
            <p className="error-text">Post not found or has been removed.</p>
            <Link to="/home" className="cta-button" style={{ background: '#7fbf9b' }}>← Back to Gallery</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-content-fade-in">
      <div className="contact-page-wrapper">
        <div className="contact-card" style={{ maxWidth: '900px', textAlign: 'left' }}>
          
          <Link to="/home" style={{ textDecoration: 'none', color: '#367456', fontWeight: 'bold' }}>
            ← Back to Gallery
          </Link>

          <hr className="divider-text" />

          <article className="post-detail">
            {post.image && (
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <img 
                  src={`http://localhost:5000/uploads/${post.image}`} 
                  alt={post.title} 
                  className="art-img-card" 
                  style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                />
              </div>
            )}
            
            <header className="section-header" style={{ marginBottom: '20px' }}>
              <h2 style={{ color: '#367456' }}>{post.title}</h2>
              <div style={{ display: 'flex', gap: '10px', color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>
                <span>By <strong>{post.author?.name || 'Guest'}</strong></span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </header>

            <div className="justify-text" style={{ whiteSpace: 'pre-wrap' }}>
              {post.body.split('\n').map((para, index) => (
                para ? <p key={index} style={{ marginBottom: '15px' }}>{para}</p> : <br key={index} />
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostPage;