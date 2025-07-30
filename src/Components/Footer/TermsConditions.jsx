import React, { useEffect, useState } from 'react';

function TermsConditions() {
  const [termsContent, setTermsContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch('https://biz-booster.vercel.app/api/termsconditions');
        const result = await response.json();
        if (result.success && result.data.length > 0) {
          setTermsContent(result.data[0].content);
        } else {
          setError('No terms found.');
        }
      } catch (err) {
        setError('Failed to fetch terms.');
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) return <p>Loading Terms & Conditions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container py-5">
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
 Terms & Conditions
</h1>
      <div dangerouslySetInnerHTML={{ __html: termsContent }} />
    </div>
  );
}

export default TermsConditions;
