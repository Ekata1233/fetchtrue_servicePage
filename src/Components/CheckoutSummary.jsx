import React from 'react';
import { Box, Typography } from '@mui/material';

const CheckoutSummary = ({ service, commission, appliedCoupon }) => {
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
    <Box sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
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
    </Box>
  );
};

export default CheckoutSummary;
