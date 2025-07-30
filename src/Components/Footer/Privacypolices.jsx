import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PrivacyPolicy() {
  const [policyContent, setPolicyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const res = await axios.get('https://biz-booster.vercel.app/api/privacypolicy');
        if (res.data.success && res.data.data.length > 0) {
          setPolicyContent(res.data.data[0].content);
        } else {
          setError('No privacy policy found.');
        }
      } catch (err) {
        setError('Failed to fetch privacy policy.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="container my-5">
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
 Privacy Policy
</h1>
      <div dangerouslySetInnerHTML={{ __html: policyContent }} />
    </div>
  );
}

export default PrivacyPolicy;
