import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../App.css'; 

const PostPage = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sending, setSending] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  // Fetch post
  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.error("Error fetching post:", err);
        setError('Post not found');
      });
  }, [id]);

  // Fetch comments
  useEffect(() => {
    if (post?._id) {
      API.get(`/comments/${post._id}`)
        .then(res => {
          setComments(res.data);
        })
        .catch(err => {
          console.error('Error fetching comments:', err);
        })
        .finally(() => setCommentsLoading(false));
    }
  }, [post?._id]);

  // No initial loading screen since post/comments load async

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setSending(true);
    try {
      const res = await API.post(`/comments/${post._id}`, { body: newComment });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment:', err);
      setError('Failed to post comment');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete your comment?')) return;
    try {
      await API.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error('Failed to delete comment:', err);
      setError('Failed to delete comment');
    }
  };

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
                  onError={(e) => {
                    console.error('Post image failed:', e.target.src);
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                    e.target.alt = 'No image available';
                  }}
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

          {/* 💬 Comments Section */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ color: '#367456', marginBottom: '20px' }}>Comments ({comments.length})</h3>
            {commentsLoading && <p>Loading comments...</p>}

            {/* Comments List */}
            <div style={{ marginBottom: '25px' }}>
              {comments.map((comment) => (
                <div key={comment._id} style={{ 
                  padding: '15px', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px', 
                  marginBottom: '15px', 
                  background: '#f9f9f9' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: '8px' 
                  }}>
                    <strong style={{ color: '#367456' }}>{comment.author?.name || 'Anonymous'}</strong>
                    <small style={{ color: '#666' }}>{new Date(comment.createdAt).toLocaleDateString()}</small>
                  </div>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{comment.body}</p>
                  {user?._id === comment.author?._id && (
                    <button 
                      onClick={() => handleDelete(comment._id)}
                      style={{ 
                        marginTop: '10px', 
                        background: '#d9534f', 
                        color: 'white', 
                        border: 'none', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        cursor: 'pointer', 
                        fontSize: '0.8rem' 
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
              {comments.length === 0 && !commentsLoading && (
                <p style={{ color: '#666', fontStyle: 'italic' }}>No comments yet. Be the first to comment!</p>
              )}
            </div>

            {/* Add New Comment Form */}
            {user ? (
              <form onSubmit={handleSubmit} style={{ padding: '20px', borderTop: '2px solid #e0e0e0' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts on this artwork..."
                    style={{ 
                      flex: 1, 
                      padding: '12px', 
                      border: '1px solid #ddd', 
                      borderRadius: '8px', 
                      resize: 'vertical', 
                      minHeight: '80px', 
                      fontFamily: 'inherit' 
                    }}
                    rows="3"
                  />
                  <button 
                    type="submit" 
                    disabled={sending || !newComment.trim()}
                    style={{
                      padding: '12px 24px', 
                      background: sending ? '#ccc' : '#367456',
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: sending ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold',
                      alignSelf: 'flex-start'
                    }}
                  >
                    {sending ? 'Sending...' : 'Post Comment'}
                  </button>
                </div>
                {error && <p style={{ color: '#d9534f', marginTop: '10px', fontSize: '0.9rem' }}>{error}</p>}
              </form>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '25px', 
                background: '#f0f8f0', 
                borderRadius: '8px', 
                border: '1px solid #c3f0d7' 
              }}>
                <p style={{ color: '#666', marginBottom: '10px' }}>💬 Log in to join the conversation</p>
                <Link to="/login" style={{ color: '#367456', textDecoration: 'none', fontWeight: 'bold' }}>
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
