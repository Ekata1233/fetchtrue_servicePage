import React, { useEffect, useState } from 'react';

function Aboutus() {
  const [aboutContent, setAboutContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await fetch('https://biz-booster.vercel.app/api/aboutus');
        const data = await response.json();

        if (data.success && data.data.length > 0) {
          setAboutContent(data.data[0].content); // HTML string
        } else {
          setError('No about us content found.');
        }
      } catch (err) {
        setError('Failed to load About Us content.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container py-4">
        <h1
  className="mb-5 fw-bold"
  style={{
    // fontSize: '1.75rem',
    background: 'linear-gradient(to right, #00509D, #0b8ec6)',
  
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  }}
>
 About Us
</h1>
      <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
    </div>
  );
}

export default Aboutus;
