import React from 'react';
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap';
import { FaCity, FaEnvelope, FaPhoneAlt, FaUser } from 'react-icons/fa';
import { Box, Typography } from '@mui/material';
import { useService } from './context/ServiceContext';

const coupons = [
  { id: 1, percent: 150, code: 'SUPER150' },
  { id: 2, percent: 100, code: 'SAVE100' },
  { id: 3, percent: 50, code: 'HALFOFF' },
];

function StepOne({
  formData,
  setFormData,
  formSaved,
  setFormSaved,
  appliedCoupon,
  setAppliedCoupon,
  inputCoupon,
  setInputCoupon,
  showAllCoupons,
  setShowAllCoupons,
  termsAgreed,
  setTermsAgreed,
  fetchtrueAssurityCharges,
  onProceed,
}) {
  const {
    service,
    createServiceCustomer,
    customerSubmitting,
    customerError,
    userId,
    commission,
    coupon, loadingCoupon
  } = useService();

  console.log("coupon details : ", coupon)

  const handleSaveForm = async () => {
    const fd = new FormData();
    fd.append("fullName", formData.name);
    fd.append("phone", formData.phone);
    fd.append("email", formData.email);
    fd.append("description", formData.description);
    fd.append("address", formData.address);
    fd.append("city", formData.city);
    fd.append("state", formData.state);
    fd.append("country", formData.country);
    fd.append("user", userId);

    const result = await createServiceCustomer(fd);

    if (result.success) {
      setFormSaved(true);
    } else {
      alert(`Failed to save: ${result.error}`);
    }
  };

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
    setInputCoupon(coupon.code);
    setShowAllCoupons(false);
  };

  const handleInputCouponApply = () => {
    const found = coupons.find((c) => c.code === inputCoupon.toUpperCase());
    if (found) handleApplyCoupon(found);
  };

  const isFormValid = () => {
    const { name, phone, email, address, state, city, country, description } = formData;
    return (
      name.trim() !== '' &&
      phone.trim() !== '' &&
      email.trim() !== '' &&
      address.trim() !== '' &&
      state.trim() !== '' &&
      city.trim() !== '' &&
      country.trim() !== '' &&
      description.trim() !== ''
    );
  };

  return (
    <Container className='mb-5'>
      {!formSaved ? (
        <Form style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
          <div className='p-3'>
            <h3 className='text-primary'>Customer Details</h3>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control placeholder="Enter your phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control placeholder="Enter your description" as="textarea" rows={1} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="Enter your address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control placeholder="Enter your state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control placeholder="Enter your city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control placeholder="Enter your country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Button onClick={handleSaveForm} disabled={customerSubmitting}>
              {customerSubmitting ? "Saving..." : "Save Data"}
            </Button>
            {customerError && <p className="text-danger mt-2">{customerError}</p>}
          </div>
        </Form>
      ) : (
        <Container className="my-4">
          <Card className="border rounded p-4" style={{ backgroundColor: '#f8f9fa' }}>
            <h5 className="mb-4 text-primary">User Details</h5>
            <div className="mb-3 d-flex align-items-center"><FaUser className="me-2 text-primary" /><span>{formData.name}</span></div>
            <div className="mb-3 d-flex align-items-center"><FaPhoneAlt className="me-2 text-success" /><span>{formData.phone}</span></div>
            <div className="mb-3 d-flex align-items-center"><FaEnvelope className="me-2 text-danger" /><span>{formData.email}</span></div>
            <div className="mb-3 d-flex align-items-center"><FaCity className="me-2 text-warning" /><span>{formData.city}</span></div>
          </Card>
        </Container>
      )}

      {/* Coupon UI */}
      <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Best Coupon For You</Typography>
          <Button variant="link" onClick={() => setShowAllCoupons(!showAllCoupons)}>
            {showAllCoupons ? 'Hide All' : 'See All'}
          </Button>
        </Box>
        <Typography>Extra {appliedCoupon ? appliedCoupon.percent : '00'}% off</Typography>
        <Typography>You save an extra ₹{appliedCoupon ? appliedCoupon.percent : '00'} with this coupon</Typography>

        <Row className="mt-2">
          <Col md={9}>
            <Form.Control
              placeholder="Type your coupon here"
              value={inputCoupon}
              onChange={(e) => setInputCoupon(e.target.value)}
              style={{ color: appliedCoupon && inputCoupon === appliedCoupon.code ? 'green' : 'black' }}
            />
          </Col>
          <Col md={3}>
            <Button onClick={handleInputCouponApply}>Apply</Button>
          </Col>
        </Row>

        {showAllCoupons && (
          <Box sx={{ mt: 3 }}>
            {coupons.map((c) => (
              <Box key={c.id} sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2, mb: 2 }}>
                <p>{c.percent}% off</p>
                <p>You save ₹{c.percent} with this coupon</p>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span><strong>Code:</strong> <span style={{ color: 'green' }}>{c.code}</span></span>
                  <Button variant="outline-primary" onClick={() => handleApplyCoupon(c)}>Apply Coupon</Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Checkout Summary */}
      <Box sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
        {(() => {
          const listingPrice = service?.price ?? 0;
          const discountPercent = service?.discount ?? 0;
          const discountAmount = (listingPrice * discountPercent) / 100;
          const priceAfterDiscount = listingPrice - discountAmount;

          const couponPercent = appliedCoupon?.percent ?? 0;
          const couponDiscount = (priceAfterDiscount * couponPercent) / 100;

          const gstPercent = service?.gst ?? 0;
          const gstAmount = (priceAfterDiscount * gstPercent) / 100;

          const platformFeePercent = commission?.[0]?.platformFee ?? 0;
          const platformFee = (listingPrice * platformFeePercent) / 100;

          const assurityFeePercent = commission?.[0]?.assurityfee ?? 0;
          const assurityFee = (listingPrice * assurityFeePercent) / 100;

          const grandTotal = priceAfterDiscount - couponDiscount + gstAmount + platformFee + assurityFee;

          return (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Listing Price </span><span>₹{listingPrice.toFixed(2)}</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Service Discount ({discountPercent}%)</span><span>- ₹{discountAmount.toFixed(2)}</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Price After Discount</span><span>₹{priceAfterDiscount.toFixed(2)}</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Coupon Discount ({couponPercent}%)</span><span>- ₹{couponDiscount.toFixed(2)}</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Service GST ({gstPercent}%)</span><span>₹{gstAmount.toFixed(2)}</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Platform Fee ({platformFeePercent}%)</span><span>₹{platformFee.toFixed(2)}</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <span>Fetch True Assurity Charges ({assurityFeePercent}%)</span><span>₹{assurityFee.toFixed(2)}</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ccc', pt: 2 }}>
                <Typography variant="h6">Grand Total</Typography>
                <Typography variant="h6">₹{grandTotal.toFixed(2)}</Typography>
              </Box>
            </>
          );
        })()}

      </Box>

      <Form.Check
        type="checkbox"
        label="I agree with the terms and conditions"
        className="mt-4"
        id="termsCheckbox"
        onChange={(e) => setTermsAgreed(e.target.checked)}
      />

      <div className="text-center mt-4">
        <Button
          variant="primary"
          onClick={() => {
            if (typeof onProceed === 'function' && isFormValid() && termsAgreed) {
              onProceed();
            }
          }}
          disabled={!(isFormValid() && termsAgreed)}
        >
          Proceed
        </Button>
      </div>
    </Container>
  );
}

export default StepOne;
