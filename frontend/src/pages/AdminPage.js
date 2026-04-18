import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import '../App.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalPosts: 0, totalUsers: 0 });
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [error, setError] = useState('');

  // 📈 Fetch user registry and metric summaries
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userRes = await API.get('/admin/users');
        const statsRes = await API.get('/admin/stats');
        setUsers(userRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Admin Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  // 📑 Fetch posts for live management
  useEffect(() => {
    const fetchPosts = async () => {
      setPostLoading(true);
      try {
        const res = await API.get('/admin/posts');
        setPosts(res.data);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setPostLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const toggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await API.put(`/admin/users/${userId}/status`, { status: newStatus });
      setUsers(users.map(u => u._id === userId ? { ...u, status: newStatus } : u));
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  const removePost = async (postId) => {
    if (!window.confirm('Remove this post?')) return;
    try {
      await API.put(`/admin/posts/${postId}/remove`);
      setPosts(posts.filter(p => p._id !== postId));
    } catch (err) {
      alert('Failed to remove post');
    }
  };

  if (loading) return <div className="loader-container"><div className="spinner"></div><p className="loading-text">Loading Dashboard...</p></div>;

  return (
    <div className="home-content-fade-in">
      <div className="contact-page-wrapper">
        
        {/* Metric Summaries in Sage Banner */}
        <div className="contact-card" style={{ maxWidth: '1000px' }}>
          <header className="section-header">
            <h2>Admin Dashboard Metrics</h2>
            <p>Real-time analytics for your community network.</p>
          </header>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '15px' }}>
            <div className="score-badge">Total Members: {stats.totalUsers}</div>
            <div className="score-badge">Total Posts Published: {stats.totalPosts}</div>
          </div>
        </div>

        {error && <div className="error-text" style={{ textAlign: 'center' }}>{error}</div>}

        {/* 👥 User Access Panel */}
        <div className="contact-card" style={{ maxWidth: '1000px' }}>
          <h3>User Management Summary ({users.length})</h3>
          <p style={{ marginBottom: '15px', color: '#666' }}>Tweak access scopes for registry accounts.</p>
          
          <div style={{ overflowX: 'auto' }}>
            <table className="resource-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.email}</td>
                    <td><span className={`badge ${u.role}`} style={{ textTransform: 'capitalize' }}>{u.role}</span></td>
                    <td>
                      <span style={{ 
                        color: u.status === 'active' ? '#367456' : '#d9534f', 
                        fontWeight: 'bold' 
                      }}>
                        {u.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="submit-btn" 
                        onClick={() => toggleStatus(u._id, u.status)}
                        style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                      >
                        {u.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 📝 Content Moderation Panel */}
        <div className="contact-card" style={{ maxWidth: '1000px' }}>
          <h3>Post Management Repository ({posts.length})</h3>
          <p style={{ marginBottom: '15px', color: '#666' }}>Audit active posts across your dashboard.</p>

          {postLoading ? (
            <div style={{ textAlign: 'center', color: '#367456' }}>Loading submissions...</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="resource-table">
                <thead>
                  <tr>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Published</th>
                    <th>Action Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(p => (
                    <tr key={p._id}>
                      <td><strong>{p.author?.name || 'Unknown'}</strong></td>
                      <td>{p.title}</td>
                      <td>{p.status}</td>
                      <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                      <td>
                        {p.status !== 'removed' && (
                          <button 
                            className="submit-btn" 
                            onClick={() => removePost(p._id)}
                            style={{ background: '#d9534f', padding: '6px 12px', fontSize: '0.85rem' }}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;