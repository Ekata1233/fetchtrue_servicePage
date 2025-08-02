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
  Button as MUIButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { stepConnectorClasses } from '@mui/material/StepConnector';

import ProductDetails from './ProductDeatils';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

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

export default function SelfAddPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [serviceCustomerId, setServiceCustomerId] = useState(null);
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
  const [checkoutId, setCheckoutId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAllCoupons, setShowAllCoupons] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [inputCoupon, setInputCoupon] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const trueAssurityCharges = 17;

  const handleNext = () => {
    if (activeStep === 0 && (!formSaved || !termsAgreed)) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            formSaved={formSaved}
            setFormSaved={setFormSaved}
            appliedCoupon={appliedCoupon}
            setAppliedCoupon={setAppliedCoupon}
            inputCoupon={inputCoupon}
            setInputCoupon={setInputCoupon}
            showAllCoupons={showAllCoupons}
            setShowAllCoupons={setShowAllCoupons}
            termsAgreed={termsAgreed}
            setTermsAgreed={setTermsAgreed}
            trueAssurityCharges={trueAssurityCharges}
            onProceed={handleNext}
            setCheckoutId={setCheckoutId}
            setTotalAmount={setTotalAmount}
            setServiceCustomerId={setServiceCustomerId}
            serviceCustomerId={serviceCustomerId}
          />
        );
      case 1:
        return <StepTwo
          onProceed={handleNext}
          checkoutId={checkoutId}
          totalAmount={totalAmount}
          formData={formData}
          serviceCustomerId={serviceCustomerId} appliedCoupon={appliedCoupon}

        />;
      case 2:
        return <StepThree />;
      default:
        return 'Unknown step';
    }
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
            <Typography variant="h6" gutterBottom>
              All steps completed — you’re finished!
            </Typography>
            <MUIButton onClick={handleReset} variant="outlined">
              Reset
            </MUIButton>
          </Box>
        ) : (
          <Box>
            <Box sx={{ mb: 2 }}>{getStepContent(activeStep)}</Box>

            {activeStep !== 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 5 }}>
                <MUIButton onClick={handleBack} disabled={activeStep === 0}>
                  Back
                </MUIButton>
                <MUIButton onClick={handleNext} variant="contained">
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
