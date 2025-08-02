import React, { useState } from 'react';
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap';
import { FaCity, FaEnvelope, FaPhoneAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useService } from './context/ServiceContext';
import CustomerForm from './CustomerForm';
import CouponSection from './CouponSection';
import CheckoutSummary from './CheckoutSummary';
import axios from 'axios';
import { Typography } from '@mui/material';
// import { toast } from 'react-toastify';

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
  setCheckoutId,
  setTotalAmount,
}) {
  const navigate = useNavigate();
  const {
    service,
    createServiceCustomer,
    userId,
    commission,
    coupon,
    loadingCoupon
  } = useService();
  const [customerError, setCustomerError] = useState('');

  const [customerSubmitting, setCustomerSubmitting] = useState(false);
  const [serviceCustomerId, setServiceCustomerId] = useState(null);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // console.log("saved service customer : ", serviceCustomerId)

  const handleSaveForm = async () => {
    setCustomerSubmitting(true);
    setCustomerError('');
    try {
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

      const customerRes = await createServiceCustomer(fd);

      if (!customerRes.success) {
        throw new Error(customerRes?.message || 'Failed to save customer');
      }
      if (customerRes.success) {
        setFormSaved(true);
        setServiceCustomerId(customerRes.data._id);
      } else {
        setCustomerError('Failed to save customer info.');
      }
    } catch (err) {
      console.error(err);
      setCustomerError('An error occurred while saving customer info.');
    } finally {
      setCustomerSubmitting(false);
    }
  };

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
    setInputCoupon(coupon.code);
    setShowAllCoupons(false);
  };

  const handleInputCouponApply = () => {
    const found = coupon.find((c) => c.code === inputCoupon.toUpperCase());
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

  const handleProceedToCheckout = async () => {
    if (!serviceCustomerId) {
      alert('Please save customer information first.');
      return;
    }

    setIsCheckoutLoading(true);

    const listingPrice = service?.price ?? 0;
    const serviceDiscount = service?.discount ?? 0;
    const priceAfterServiceDiscount = listingPrice - (listingPrice * serviceDiscount) / 100;
    const couponDiscount = coupon?.percent ?? 0;
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
      provider: null,
      serviceMan: null,
      coupon: coupon?._id ?? null,

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
      paymentMethod: 'pac',
      walletAmount: 0,
      otherAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
      isPartialPayment: false,

      paymentStatus: 'pending',
      orderStatus: 'processing',
      notes: formData.notes,
    };

    console.log("checkout data: ", checkoutData);

    try {
      const res = await axios.post(
        'https://biz-booster.vercel.app/api/checkout',
        checkoutData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("checkout response: ", res);

      if (res?.data?.success) {
        alert('Checkout created successfully!');
        setCheckoutId(res.data.data._id); // assuming response contains .data._id
        setTotalAmount(totalAmount);
        onProceed();
      } else {
        alert('Failed to create checkout.');
      }
    } catch (err) {
      console.error("Checkout POST error:", err.message);
      if (err.response) {
        console.error("Backend responded with:", err.response.data);
      }
      alert('Something went wrong while saving checkout.');
    } finally {
      setIsCheckoutLoading(false);
    }
  }


  return (
    <Container className='my-5'>
      <CustomerForm
        formData={formData}
        setFormData={setFormData}
        customerSubmitting={customerSubmitting}
        customerError={customerError}
        formSaved={formSaved}
        handleSaveForm={handleSaveForm}
      />

      {formSaved && (
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

      <CouponSection
        coupons={coupon}
        appliedCoupon={appliedCoupon}
        inputCoupon={inputCoupon}
        setInputCoupon={setInputCoupon}
        setAppliedCoupon={setAppliedCoupon}
        showAllCoupons={showAllCoupons}
        setShowAllCoupons={setShowAllCoupons}
      />

      <CheckoutSummary
        service={service}
        commission={commission}
        appliedCoupon={appliedCoupon}
      />

      <div>
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
            onClick={async () => {

              if (isFormValid() && termsAgreed) {
                // await handleSaveForm();
                handleProceedToCheckout();
              }
            }}
            disabled={!(isFormValid() && termsAgreed)}
          >
            {/* {isCheckoutLoading ? <CircularProgress size={24} /> : 'Proceed to Payment'} */}
            Proceed
          </Button>
          {!formSaved && (
            <Typography variant="body2" color="error" mt={1}>
              Please save customer info before proceeding.
            </Typography>
          )}
        </div>
      </div>
    </Container>
  );
}

export default StepOne;
