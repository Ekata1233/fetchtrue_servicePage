import React, { useState } from 'react';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';

export default function StepTwo({ onProceed, checkoutId, totalAmount, formData }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cashfreeOption, setCashfreeOption] = useState('');

  const fullAmount = totalAmount || 4999;
  const partialAmount = Math.round(fullAmount / 2);


  const handlePayNow = async () => {
    if (!checkoutId) {
      alert('Checkout ID not found.');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    if (paymentMethod === 'cashfree' && !cashfreeOption) {
      alert('Please select Full or Partial payment.');
      return;
    }

    const selectedAmount = getSelectedAmount();

    try {
      const response = await fetch('https://biz-booster.vercel.app/api/payment/generate-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: `checkout_${checkoutId}`,
          amount: selectedAmount,
          customerId: checkoutId, // OR use userId if required
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          checkoutId,
        }),
      });

      const data = await response.json();
      console.log("Payment API Response:", data);

      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        alert('Failed to generate payment link.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed.');
    }
  };


  // Determine displayed total based on selected option
  const getSelectedAmount = () => {
    if (paymentMethod === 'cashfree') {
      if (cashfreeOption === 'full') return fullAmount;
      if (cashfreeOption === 'partial') return partialAmount;
    }
    return fullAmount; // default
  };

  return (
    <Container style={{ maxWidth: '800px', marginTop: '20px' }}>
      <Card className="p-4">
        <h4 className="mb-4 text-primary text-center">Select Payment Method</h4>
        <Form>
          <Row className="g-4">
            {/* Cashfree Pay Section */}
            <Col md={6}>
              <Card
                className={`p-3 h-100 ${paymentMethod === 'cashfree' ? 'border-primary border-2' : ''}`}
                onClick={() => {
                  setPaymentMethod('cashfree');
                  setCashfreeOption('');
                }}
                style={{ cursor: 'pointer' }}
              >
                <Form.Check
                  type="radio"
                  label={<strong>Cashfree Pay</strong>}
                  name="paymentMethod"
                  value="cashfree"
                  checked={paymentMethod === 'cashfree'}
                  onChange={() => {
                    setPaymentMethod('cashfree');
                    setCashfreeOption('');
                  }}
                />
                <p className="text-muted mt-2">Pay securely online via Cashfree.</p>

                {paymentMethod === 'cashfree' && (
                  <div className="ms-3 mt-3">
                    <Form.Check
                      type="radio"
                      label={`Full Payment (₹${fullAmount})`}
                      name="cashfreeOption"
                      value="full"
                      checked={cashfreeOption === 'full'}
                      onChange={(e) => setCashfreeOption(e.target.value)}
                    />
                    {/* <Form.Check
                      type="radio"
                      label={`Partial Payment (₹${partialAmount})`}
                      name="cashfreeOption"
                      value="partial"
                      checked={cashfreeOption === 'partial'}
                      onChange={(e) => setCashfreeOption(e.target.value)}
                      className="mt-2"
                    /> */}
                  </div>
                )}
              </Card>
            </Col>

            {/* Pay After Consultation Section */}
            <Col md={6}>
              <Card
                className={`p-3 h-100 ${paymentMethod === 'consultation' ? 'border-primary border-2' : ''}`}
                onClick={() => {
                  setPaymentMethod('consultation');
                  setCashfreeOption('');
                }}
                style={{ cursor: 'pointer' }}
              >
                <Form.Check
                  type="radio"
                  label={<strong>Pay After Consultation</strong>}
                  name="paymentMethod"
                  value="consultation"
                  checked={paymentMethod === 'consultation'}
                  onChange={() => {
                    setPaymentMethod('consultation');
                    setCashfreeOption('');
                  }}
                />
                <p className="text-muted mt-2">You will be contacted for payment after a consultation.</p>
              </Card>
            </Col>
          </Row>

          {/* Total and Pay Now Button */}
          <div className="text-center mt-5">
            <h5>
              Total Amount:{' '}
              {paymentMethod === 'consultation' ? 'To be decided after consultation' : `₹${getSelectedAmount()}`}
            </h5>
            <Button variant="primary" className="mt-3 px-5" onClick={handlePayNow}>
              Pay Now
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
