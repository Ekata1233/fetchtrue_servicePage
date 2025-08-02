import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useService } from './context/ServiceContext';

export default function StepTwo({ onProceed, checkoutId, totalAmount, formData, serviceCustomerId, appliedCoupon }) {
  const {
    userId,
    service,
    commission,
    coupon,selectedProviderId ,
  } = useService();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cashfreeOption, setCashfreeOption] = useState('');

  const fullAmount = totalAmount ?? 0;
  const partialAmount = Math.round(fullAmount / 2);

console.log('selectedProviderId  : ', selectedProviderId )

  const handleProceed = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    if (paymentMethod === 'cashfree' && !cashfreeOption) {
      alert('Please select Full or Partial payment.');
      return;
    }

    const selectedAmount = getSelectedAmount();

    const listingPrice = service?.price ?? 0;
    const serviceDiscount = service?.discount ?? 0;
    const priceAfterServiceDiscount = listingPrice - (listingPrice * serviceDiscount) / 100;

    const couponObj = appliedCoupon ?? null;
    const couponDiscount = couponObj?.percent ?? 0;

    const priceAfterCoupon = priceAfterServiceDiscount - (priceAfterServiceDiscount * couponDiscount) / 100;

    const gst = service?.gst ?? 0;
    const gstAmount = (priceAfterCoupon * gst) / 100;

    const platformFee = commission?.[0]?.platformFee ?? 0;
    const platformFeeAmount = (listingPrice * platformFee) / 100;

    const assurityFee = commission?.[0]?.assurityfee ?? 0;
    const assurityFeeAmount = (listingPrice * assurityFee) / 100;

    const totalAmount = priceAfterCoupon + gstAmount + platformFeeAmount + assurityFeeAmount;


    const checkoutData = {
      user: userId,
      service: service?._id,
      serviceCustomer: serviceCustomerId,
      provider: selectedProviderId ?? null,
      serviceMan: null,
      coupon: couponObj?._id ?? null,

      subtotal: priceAfterServiceDiscount,
      serviceDiscount,
      couponDiscount,
      champaignDiscount: 0,
      gst,
      platformFee,
      assurityfee: assurityFee,

      listingPrice,
      serviceDiscountPrice: (listingPrice * serviceDiscount) / 100,
      priceAfterDiscount: priceAfterServiceDiscount,
      couponDiscountPrice: (priceAfterServiceDiscount * couponDiscount) / 100,
      serviceGSTPrice: gstAmount,
      platformFeePrice: platformFeeAmount,
      assurityChargesPrice: assurityFeeAmount,

      totalAmount,

      termsCondition: true,
      paymentMethod,
      walletAmount: 0,
      otherAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
      isPartialPayment: paymentMethod === 'cashfree' && cashfreeOption === 'partial',

      paymentStatus: 'pending',
      orderStatus: 'processing',
      notes: formData.notes,
    };

    try {
      const res = await fetch('https://biz-booster.vercel.app/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await res.json();

      if (data?.success && data?.data?._id) {
        const newCheckoutId = data.data._id;

        if (paymentMethod === 'cashfree') {
          // generate payment link
          const paymentRes = await fetch('https://biz-booster.vercel.app/api/payment/generate-payment-link', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: `checkout_${newCheckoutId}`,
              amount: selectedAmount,
              customerId: newCheckoutId,
              customerName: formData.name,
              customerEmail: formData.email,
              customerPhone: formData.phone,
              checkoutId: newCheckoutId,
            }),
          });

          const paymentData = await paymentRes.json();

          if (paymentData.paymentLink) {
            window.location.href = paymentData.paymentLink;
          } else {
            alert('Failed to generate payment link.');
          }
        } else {
          alert('Checkout saved successfully. We will contact you shortly.');
          onProceed(); // or navigate to thank you
        }
      } else {
        alert('Failed to create checkout.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong while creating checkout.');
    }
  };


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
                    
                  </div>
                )}
              </Card>
            </Col>

            {/* Pay After Consultation Section */}
            <Col md={6}>
              <Card
                className={`p-3 h-100 ${paymentMethod === 'pac' ? 'border-primary border-2' : ''}`}
                onClick={() => {
                  setPaymentMethod('pac');
                  setCashfreeOption('');
                }}
                style={{ cursor: 'pointer' }}
              >
                <Form.Check
                  type="radio"
                  label={<strong>Pay After Consultation</strong>}
                  name="paymentMethod"
                  value="pac"
                  checked={paymentMethod === 'pac'}
                  onChange={() => {
                    setPaymentMethod('pac');
                    setCashfreeOption('');
                  }}
                />
                <p className="text-muted mt-2">You will be contacted for payment after a consultation.</p>
              </Card>
            </Col>
          </Row>

        
          <div className="text-center mt-5">
            <h5>
              Total Amount:{' '}
              {paymentMethod === 'pac' ? 'To be decided after consultation' : `₹${getSelectedAmount()}`}
            </h5>
            <Button
              variant="primary"
              className="mt-3 px-5"
              onClick={handleProceed}
            >
              {paymentMethod === 'pac' ? 'Save' : 'Pay Now'}
            </Button>
          </div>

        </Form>
      </Card>
    </Container>
  );
}
