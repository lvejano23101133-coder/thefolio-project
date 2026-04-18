import React, { useState } from 'react';
import API from '../api/axios'; // Make sure this path points to your axios instance!
import '../App.css';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      // 🚀 Send to your Express.js / MongoDB Backend
      await API.post('/contact', formData);
      setStatus({ type: 'success', msg: `Salamat, ${formData.name}! Na-receive ko na ang message mo. 🌿` });
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', msg: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      
      {/* SECTION 1: Get in Touch */}
      <section className="contact-card">
        <h2>Get in Touch</h2>

        {status.msg && (
          <div style={{
            padding: '12px',
            borderRadius: '10px',
            marginBottom: '20px',
            backgroundColor: status.type === 'success' ? '#c3f0d7' : '#ffcccc',
            color: status.type === 'success' ? '#2a5a42' : '#990000',
            textAlign: 'center'
          }}>
            {status.msg}
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-input-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="form-input-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              placeholder="your@email.com" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-input-group">
            <label htmlFor="message">Message:</label>
            <textarea 
              id="message"
              name="message" 
              placeholder="Type your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </section>

      {/* SECTION 2: Art Resources */}
      <section className="contact-card">
        <h2>Art Resources</h2>
        <div className="table-responsive">
          <table className="resource-table">
            <thead>
              <tr>
                <th>Resource Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Pinterest</td><td>Visual discovery for art references.</td></tr>
              <tr><td>Adobe Color</td><td>Professional color schemes.</td></tr>
              <tr><td>Canva</td><td>Graphic design tool.</td></tr>
              <tr><td>Pixlr</td><td>Online photo editor.</td></tr>
              <tr><td>YouTube</td><td>Art tutorials and tips.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: Location */}
      <section className="contact-card">
        <h2>Location</h2>
        <div className="map-frame">
          <iframe 
            title="Google Maps Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.452934091176!2d120.3995817743257!3d15.990264041530932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33913fbc48946765%3A0x6b63303c7ffebda3!2sDon%20Mariano%20Marcos%20Memorial%20State%20University%20-%20South%20La%20Union%20Campus%20(DMMMSU-SLUC)!5e0!3m2!1sen!2sph!4v1711200000000!5m2!1sen!2sph"
            width="100%" 
            height="350" 
            style={{border:0, borderRadius: '15px'}} 
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;