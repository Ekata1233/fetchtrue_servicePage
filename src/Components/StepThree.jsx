import React from 'react';

export default function StepThree() {
  const darkBlue = '#0D47A1';

  const styles = {
    page: {
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    container: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '40px',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    icon: {
      fontSize: '60px',
      color: darkBlue,
      marginBottom: '20px',
    },
    heading: {
      color: darkBlue,
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    text: {
      color: '#333',
      fontSize: '16px',
      marginBottom: '30px',
    },
    divider: {
      borderTop: '1px solid #ccc',
      margin: '20px 0',
    },
    bookingSection: {
      textAlign: 'left',
      color: '#333',
    },
    bookingTitle: {
      color: darkBlue,
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    bookingItem: {
      marginBottom: '4px',
    },
    button: {
      marginTop: '30px',
      backgroundColor: darkBlue,
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.icon}>✅</div>
        <div style={styles.heading}>Booking Successful!</div>
        <div style={styles.text}>
          {/* Thank you for your booking. Your payment has been processed successfully. */}
        </div>

        <div style={styles.divider}></div>

        {/* <div style={styles.bookingSection}>
          <div style={styles.bookingTitle}>Booking Details</div>
          <div style={styles.bookingItem}>Booking ID : checkoutId</div>
          <div style={styles.bookingItem}>Date: August 5, 2025</div>
          <div style={styles.bookingItem}>Amount Paid: ₹1,200</div>
        </div> */}

        <button style={styles.button} onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
}
