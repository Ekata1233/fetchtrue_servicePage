import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Button, Row, Col, Form } from 'react-bootstrap';

const CouponSection = ({
  coupons,
  appliedCoupon,
  inputCoupon,
  setInputCoupon,
  setAppliedCoupon,
  showAllCoupons,
  setShowAllCoupons,
  subtotal = 1000, // pass subtotal from parent if needed
}) => {
  const [invalidCoupon, setInvalidCoupon] = useState(false);

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
    setInputCoupon(coupon.couponCode);
    setShowAllCoupons(false);
    setInvalidCoupon(false);
  };

  const handleInputCouponApply = () => {
    const found = coupons?.data?.find(
      (c) => c.couponCode.toUpperCase() === inputCoupon.toUpperCase()
    );
    if (found) {
      handleApplyCoupon(found);
    } else {
      setInvalidCoupon(true);
    }
  };

  const getDiscountText = (coupon) => {
    if (!coupon) return { label: '00', saving: '00' };

    if (coupon.discountAmountType === 'Percentage') {
      const discount = (coupon.amount / 100) * subtotal;
      const saving = coupon.maxDiscount
        ? Math.min(discount, coupon.maxDiscount)
        : discount;
      return {
        label: `${coupon.amount}%`,
        saving: `₹${Math.floor(saving)}`,
      };
    } else {
      return {
        label: `₹${coupon.amount}`,
        saving: `₹${coupon.amount}`,
      };
    }
  };

  const { label, saving } = getDiscountText(appliedCoupon);

  return (
    <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Best Coupon For You</Typography>
        <Button
          variant="link"
          onClick={() => setShowAllCoupons(!showAllCoupons)}
        >
          {showAllCoupons ? 'Hide All' : 'See All'}
        </Button>
      </Box>

      <Typography>Extra {label} off</Typography>
      <Typography>You save an extra {saving} with this coupon</Typography>

      <Row className="mt-2">
        <Col md={9}>
          <Form.Control
            placeholder="Type your coupon here"
            value={inputCoupon}
            onChange={(e) => setInputCoupon(e.target.value)}
            style={{
              color:
                appliedCoupon &&
                inputCoupon.toUpperCase() === appliedCoupon.couponCode
                  ? 'green'
                  : 'black',
            }}
          />
          {invalidCoupon && (
            <Typography variant="caption" color="error">
              Invalid coupon code.
            </Typography>
          )}
        </Col>
        <Col md={3}>
          <Button onClick={handleInputCouponApply}>Apply</Button>
        </Col>
      </Row>

      {showAllCoupons && (
        <Box sx={{ mt: 3 }}>
          {coupons?.data?.map((c) => {
            const { label, saving } = getDiscountText(c);
            return (
              <Box
                key={c._id}
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  p: 2,
                  mb: 2,
                }}
              >
                <p>{label} off</p>
                <p>You save {saving} with this coupon</p>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>
                    <strong>Code:</strong>{' '}
                    <span style={{ color: 'green' }}>{c.couponCode}</span>
                  </span>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleApplyCoupon(c)}
                  >
                    Apply Coupon
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default CouponSection;
