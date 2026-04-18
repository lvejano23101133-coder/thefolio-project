import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import myPic from '../assets/mypic.jpg'; // Verify file path to your photo!
import '../App.css';

const HomePage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛰️ Phase 2: Fetch Live Posts from Database
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p className="loading-text">Bringing it to life...</p>
      </div>
    );
  }

  return (
    <div className="home-content-fade-in">

      {/* 🌿 Profile Hero */}
      <div className="index-hero-wrapper">
        <div className="index-hero-content">
          <div className="index-hero-text">
            <h2>{user ? `Hi, I'm ${user.name}` : "Hi! I'm Lyka"}</h2>
            <p className="quote">"Art is a journey, not a destination."</p>
            <h3>Welcome to My Creative World: <br /> A Personal Space for Growth</h3>
            <p className="justify-text">
              This portfolio highlights my passion for art, creativity, and self-expression. 
              Through different mediums and styles, art allows me to communicate emotions and ideas visually.
            </p>
            <Link to="/about" className="cta-button">View My Gallery</Link>
          </div>

          <div className="index-hero-image">
            <img src={myPic} alt="Lyka" />
          </div>
        </div>
      </div>

      {/* 🌿 Explore My Portfolio Section */}
      <section style={{ backgroundColor: '#c3f0d7', padding: '40px 20px' }}>
        <h2 style={{ textAlign: 'left', color: '#2a5a42', paddingLeft: '2rem' }}>Explore My Portfolio</h2>
        <p style={{ textAlign: 'center', color: '#344e41', marginBottom: '25px' }}>
          Discover my artistic journey through these creative pillars:
        </p>

        <div className="aesthetic-card-grid">
          <div className="aesthetic-item">
            <span style={{ fontSize: '1.5rem' }}>🎨</span>
            <h4>Fine Arts</h4>
            <p>Traditional techniques meeting modern vision.</p>
          </div>
          <div className="aesthetic-item">
            <span style={{ fontSize: '1.5rem' }}>📷</span>
            <h4>Photography</h4>
            <p>Freezing time through the lens of a dreamer.</p>
          </div>
          <div className="aesthetic-item">
            <span style={{ fontSize: '1.5rem' }}>🌿</span>
            <h4>Design</h4>
            <p>Clean, purposeful, and aesthetic layouts.</p>
          </div>
        </div>
      </section>

      {/* 🚀 Phase 2 Feature: Dynamic Database Post Feed below the pillars */}
      <div className="contact-page-wrapper">
        <div className="contact-card" style={{ maxWidth: '1100px' }}>
          
          {posts.length === 0 ? (
            /* ✅ SHOW THIS CENTERED CARD IF DATABASE IS EMPTY */
            <div className="community-gallery-card">
              <h3>Community Gallery</h3>
              <p>Live uploads from your Node.js database!</p>
              <p style={{ marginTop: '20px', color: '#666' }}>No community posts yet.</p>
              <Link to="/create" className="create-post-link">Create the First Post</Link>
            </div>
          ) : (
            /* ✅ SHOW THIS GRID IF DATABASE HAS POSTS */
            <>
              <header className="section-header" style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2>Community Gallery</h2>
                <p>Live uploads from your Node.js database!</p>
              </header>

              <div className="galleryy">
                {posts.map(post => (
                  <article key={post._id} className="aesthetic-item" style={{ textAlign: 'left', background: 'white' }}>
                    {post.image && (
                      <img 
                        src={`http://localhost:5000/uploads/${post.image}`} 
                        alt={post.title} 
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '15px' }} 
                      />
                    )}
                    <div style={{ padding: '15px 0' }}>
                      <h4>
                        <Link to={`/posts/${post._id}`} style={{ color: '#367456', textDecoration: 'none' }}>
                          {post.title}
                        </Link>
                      </h4>
                      <p>{post.body.substring(0, 100)}...</p>
                      <small style={{ color: '#666' }}>By {post.author?.name || 'Guest'}</small>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default HomePage;