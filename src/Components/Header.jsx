import React from "react";

function ProductHeader() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Animation Keyframes + Responsive Styles */}
      <style>{`
        @keyframes bubbleRiseTwist {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-40px) rotate(-10deg);
            opacity: 0.2;
          }
        }

        .product-header {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: #fff;
          padding: 4rem 1.5rem 6rem 1.5rem;
          position: relative;
          text-align: left;
        }

        .product-header h2 {
          font-size: 2.5rem;
          margin: 0 0 0.5rem;
        }

        .product-header p {
          font-size: 1.1rem;
          max-width: 650px;
          opacity: 0.9;
        }

        .bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 50%;
          filter: blur(1px);
          animation: bubbleRiseTwist ease-in-out infinite;
          z-index: 0;
        }

        @media (max-width: 768px) {
          .product-header h2 {
            font-size: 2rem;
          }
          .product-header p {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .product-header h2 {
            font-size: 1.6rem;
          }
          .product-header p {
            font-size: 0.9rem;
          }
        }
      `}</style>

      {/* Header Content */}
      <div className="product-header">
        <h2>
          <a
            href="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Fetch <span style={{ color: "#ffd700" }}>True</span>
            <span style={{ fontWeight: "900" }}>.</span>
          </a>
        </h2>
        <p>
          India’s First <strong>Hybrid B2B Marketplace + Growth Partner Network</strong> helping businesses grow faster & smarter.
        </p>
      </div>

      {/* Floating Bubbles */}
      {[...Array(10)].map((_, i) => {
        const size = 30 + Math.random() * 50;
        const left = Math.random() * 95;
        const top = Math.random() * 90;
        const duration = 8 + Math.random() * 4;
        const delay = Math.random() * 2;

        return (
          <div
            key={i}
            className="bubble"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}

      {/* Bottom SVG Curve */}
      <svg
  style={{
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "auto", // makes height scale
    aspectRatio: "1440 / 100", // keeps it proportional (supported in modern browsers)
  }}
  viewBox="0 0 1440 100"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill="#ffffff"
    d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,58.7C840,64,960,64,1080,58.7C1200,53,1320,43,1380,37.3L1440,32V100H1380C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100H0Z"
  />
</svg>

    </div>
  );
}

export default ProductHeader;
