import { useState } from "react";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

function Contact({ discountedPrice }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpay = async () => {
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      alert("Razorpay key is missing! Check your .env file.");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: discountedPrice * 100, // Convert to paise
      currency: "INR",
      name: "FTFL Technology",
      description: "Service Payment",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: formData.name || "Test User",
        email: formData.email || "test@example.com",
        contact: formData.mobile || "9876543210",
      },
      theme: { color: "#00509D" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <div className="heading-container product-heading mt-5">
        <h2 className="text-center mt-4 fw-bold" style={{ textShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)" }}>
          Submit Your Details
        </h2>
      </div>
      <h5 className="fw-bold text-center blue">Fill in your details to experience our best services!</h5>

      <Container>
        <Form>
          <Row className="shadow-box p-4 rounded">
          <Col xs={12} md={6} className="my-3">
              <Form.Group controlId="formName">
                <Form.Label className="fw-bold">Name</Form.Label>
                <Form.Control name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="p-3" required />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} className="my-3">
              <Form.Group controlId="formMobile">
                <Form.Label className="fw-bold">Mobile No</Form.Label>
                <Form.Control type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter your mobile number" className="p-3" required />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} className="my-3">
              <Form.Group controlId="formEmail">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="p-3" required />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} className="my-3">
              <Form.Group controlId="formAddress">
                <Form.Label className="fw-bold">Address</Form.Label>
                <Form.Control name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" className="p-3" />
              </Form.Group>
            </Col>

            <Col xs={12} className="my-4">
              <Form.Group controlId="formRequirements">
                <Form.Control as="textarea" rows={3} name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Your Requirements" style={{ height: "150px" }} />
              </Form.Group>
            </Col>

           
            <Col xs={12} className="text-center my-3">
              <h4 className="fw-bold">
                Total Price:
                <span className="fw-bold ms-2 fs-4"> ₹ {discountedPrice} </span>
              </h4>
            </Col>

            <Col xs={12} md={6} className="my-2">
              <Button type="submit" className="border-none py-2 fw-bold send-btn w-100" style={{ backgroundColor: "#00509D" }}>
                Apply Now
              </Button>
            </Col>

            <Col xs={12} md={6} className="my-2">
              <Button onClick={loadRazorpay} className="border-none py-2 px-3 fw-bold send-btn w-100">
                Buy Now
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

Contact.propTypes = {
  discountedPrice: PropTypes.number.isRequired,
};

export default Contact;
