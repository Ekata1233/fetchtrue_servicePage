import React, { useEffect, useState } from "react";
import axios from "axios";

const RefundPolicy = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRefundPolicy = async () => {
      try {
        const res = await axios.get("https://biz-booster.vercel.app/api/refundpolicy");
        if (res.data.success && res.data.data.length > 0) {
          setContent(res.data.data[0].content);
        } else {
          setError("No refund policy data found.");
        }
      } catch (err) {
        setError("Failed to fetch refund policy.");
      } finally {
        setLoading(false);
      }
    };

    fetchRefundPolicy();
  }, []);

  if (loading) return <p>Loading refund policy...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
 Refund Policy
</h1>
      <div
        className="policy-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default RefundPolicy;
