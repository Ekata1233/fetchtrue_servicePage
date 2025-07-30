import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CancellationPolicy() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await axios.get('https://biz-booster.vercel.app/api/cancellationpolicy');
        if (res.data.success && res.data.data.length > 0) {
          setContent(res.data.data[0].content);
        }
      } catch (err) {
        console.error('Error fetching cancellation policy:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  return (
    <div className="container my-4">
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
  Cancellation Policy
</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
}

export default CancellationPolicy;
