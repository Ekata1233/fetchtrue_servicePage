// SelfAddPage.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepConnector,
  TextField,
  Button as MUIButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import ProductDetails from './ProductDeatils';

import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap';
import { FaCity, FaEnvelope, FaPhoneAlt, FaUser } from 'react-icons/fa';

// === Custom Connector ===
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(90deg, #00509D 0%, #00509D 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(90deg, #00509D 0%, #00509D 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
}));

// === Custom Step Icon ===
const ColorlibStepIconRoot = styled('div')(({ ownerState }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(136deg, #007BFF 0%, #00509D 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(136deg, #007BFF 0%, #00509D 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;
  const icons = {
    1: <InfoIcon />,
    2: <PaymentIcon />,
    3: <CheckCircleIcon />,
  };
  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}
ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
};

const steps = ['Enter Details', 'Make Payment', 'Complete'];
const states = ['Maharashtra', 'Madhya Pradesh', 'Gujarat'];
const cities = {
  Maharashtra: ['Mumbai', 'Pune'],
  'Madhya Pradesh': ['Bhopal', 'Indore'],
  Gujarat: ['Ahmedabad', 'Surat'],
};
const coupons = [
  { id: 1, percent: 150, code: 'SUPER150' },
  { id: 2, percent: 100, code: 'SAVE100' },
  { id: 3, percent: 50, code: 'HALFOFF' },
];

export default function SelfAddPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
    address: '',
    state: '',
    city: '',
    country: '',
  });
  const [formSaved, setFormSaved] = useState(false);
  const [showAllCoupons, setShowAllCoupons] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [inputCoupon, setInputCoupon] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
const trueAssurityCharges = 17; 
  const handleNext = () => {
    if (activeStep === 0 && (!formSaved || !termsAgreed)) return;
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);
  const handleSaveForm = () => setFormSaved(true);
  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
    setInputCoupon(coupon.code);
    setShowAllCoupons(false);
  };
  const handleInputCouponApply = () => {
    const found = coupons.find((c) => c.code === inputCoupon.toUpperCase());
    if (found) handleApplyCoupon(found);
  };

  const getStepContent = (step) => {
    if (step === 0) {
      return (
        <Container>
          {!formSaved ? (
            <Form style={{ border: '1px solid #ccc', borderRadius: '8px' }} className=''>
              <div className='p-3'>
                <h3 className=' #00509D'>Customer Details</h3>
                <Row className="mb-3 ">
                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={1} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Select value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value, city: '' })}>
                      <option value="">Select</option>
                      {states.map((s) => <option key={s} value={s}>{s}</option>)}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Select value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} disabled={!formData.state}>
                      <option value="">Select</option>
                      {(cities[formData.state] || []).map((c) => <option key={c} value={c}>{c}</option>)}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                  </Form.Group>
                </Col>
              </Row>
              <Button onClick={handleSaveForm}>Save Data</Button>
              </div>
            </Form>
          ) : (
            <Container className="my-4">
              <Card className="border rounded p-4" style={{ backgroundColor: '#f8f9fa' }}>
                <h5 className="mb-4 text-primary">User Details</h5>
                <div className="mb-3 d-flex align-items-center">
                  <FaUser className="me-2 text-primary" />
                  <span>{formData.name}</span>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <FaPhoneAlt className="me-2 text-success" />
                  <span>{formData.phone}</span>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <FaEnvelope className="me-2 text-danger" />
                  <span>{formData.email}</span>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <FaCity className="me-2 text-warning" />
                  <span>{formData.city}</span>
                </div>
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
                  style={{
                    color: appliedCoupon && inputCoupon === appliedCoupon.code ? 'green' : 'black',
                  }}
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
  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Listing Price (15%)</span>
    <span>₹1000</span>
  </Box>

  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Service Discount (10%)</span>
    <span>- ₹100</span>
  </Box>

  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Price After Discount</span>
    <span>₹900</span>
  </Box>

  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Coupon Discount ({appliedCoupon?.percent || 0}%)</span>
    <span>- ₹{appliedCoupon ? ((900 * appliedCoupon.percent) / 100).toFixed(2) : '0.00'}</span>
  </Box>

  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Service GST (18%)</span>
    <span>₹153</span>
  </Box>

  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Platform Fee ( ₹ )</span>
    <span>₹30</span>
  </Box>

  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
    <span>True Assurity Charges (2%)</span>
    <span>₹{trueAssurityCharges}</span>
  </Box>

  <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ccc', pt: 2 }}>
    <Typography variant="h6">Grand Total</Typography>
    <Typography variant="h6">
      ₹{(() => {
        const base = 1000;
        const serviceDiscount = base * 0.1;
        const afterServiceDiscount = base - serviceDiscount;
        const couponDiscount = appliedCoupon ? (afterServiceDiscount * appliedCoupon.percent) / 100 : 0;
        const total = afterServiceDiscount - couponDiscount + 153 + 30 + (trueAssurityCharges || 0);
        return total.toFixed(2);
      })()}
    </Typography>
  </Box>
</Box>


          {/* Terms & Proceed */}
          <Form.Check
            type="checkbox"
            label="I agree with the terms and conditions"
            className="mt-4"
            id="termsCheckbox"
            onChange={(e) => setTermsAgreed(e.target.checked)}
          />
          <Button
            variant="primary"
            className="mt-3 w-100"
            disabled={!formSaved || !termsAgreed}
            onClick={handleNext}
          >
            Proceed
          </Button>
        </Container>
      );
    }

    if (step === 1) return 'Step 2: Provide payment information.';
    if (step === 2) return 'Step 3: Confirmation complete!';
    return '';
  };

  return (
    <>
      <ProductDetails />
      <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', mt: 6 }}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>All steps completed — you’re finished!</Typography>
            <MUIButton onClick={handleReset} variant="outlined">Reset</MUIButton>
          </Box>
        ) : (
          <Box>
            <Typography sx={{ mb: 2 }}>{getStepContent(activeStep)}</Typography>
            {activeStep !== 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <MUIButton disabled={activeStep === 0} onClick={handleBack}>Back</MUIButton>
                <MUIButton variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </MUIButton>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
