import { useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row
} from "react-bootstrap";
import { IoMdDoneAll } from "react-icons/io";
import { FaShareAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useService } from "./context/ServiceContext";

function FAQs() {
  const navigate = useNavigate();
  const { service, loading } = useService();



  const [showModal, setShowModal] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState("fetch-true");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleProceed = () => {
    handleClose();
    navigate("/self-add");
  };

  const faqList = [
    {
      question: "What is Fetch True and how does it work?",
      points: [
        "Fetch True is an advanced provider verification tool.",
        "It helps ensure data reliability in service transactions.",
        "Users can trust services validated by Fetch True.",
        "It minimizes fraud and misinformation.",
        "Easy to use and integrates seamlessly."
      ]
    },
    {
      question: "How do I register as a provider?",
      points: [
        "Click on the 'Self Add' button.",
        "Choose your provider type and submit details.",
        "Verification may take up to 24 hours.",
        "Once verified, your profile is active.",
        "You’ll receive email confirmation."
      ]
    },
    {
      question: "What are the benefits of using Fetch True?",
      points: [
        "Verified and trustworthy service providers.",
        "Real-time data and performance insights.",
        "User reviews and ratings.",
        "Reduced risk of spam or fraud.",
        "Boosts customer confidence."
      ]
    },
    {
      question: "How do I contact support?",
      points: [
        "Use the 'Contact Us' page in the app.",
        "Available via chat, email, or phone.",
        "Response time is under 24 hours.",
        "Premium users get priority support.",
        "Support available 7 days a week."
      ]
    }
  ];

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!service) return <div className="text-center my-5">No service data available.</div>;

  return (
    <div className="py-5" style={{ backgroundColor: "rgba(0, 81, 157, 0.04)" }}>
      <Container>
        <div className="text-center mb-4">
          <h2
            className="fw-bold"
            style={{
              textShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
              textDecoration: "underline"
            }}
          >
            FAQs
          </h2>
        </div>

        <Row>
          <Col xs={12}>
            <Accordion defaultActiveKey="" className="text-start border-0">
              {faqList.map((faq, index) => (
                <Accordion.Item
                  eventKey={index.toString()}
                  className="accor py-4"
                  key={index}
                >
                  <Accordion.Header>
                    <h6 className="dark fw-bold mb-0">{faq.question}</h6>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-unstyled text-secondary">
                      {faq.points.map((point, idx) => (
                        <li key={idx}>
                          <IoMdDoneAll
                            className="text-success me-2"
                            style={{ width: "22px", height: "22px" }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>

        {/* Buttons */}
        <Container className="mt-5">
          <Row>
            <Col xs={12} md={6} className="my-2">
              <Button
                type="button"
                className="border-none py-2 fw-bold send-btn w-100"
                style={{ backgroundColor: "#00509D" }}
                onClick={handleShow}
              >
                <FaUserPlus className="me-2" />
                Self Add
              </Button>
            </Col>

            <Col xs={12} md={6} className="my-2">
              <Button
                type="button"
                className="border-none py-2 px-3 fw-bold send-btn w-100"
                onClick={() => navigate("/share-to-customer")}
              >
                <FaShareAlt className="me-2" />
                Share To Customer
              </Button>
            </Col>
          </Row>
        </Container>

        {/* Modal */}
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Provider Available</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Check
              type="radio"
              label="Fetch True"
              name="providerOptions"
              value="fetch-true"
              checked={selectedProviders === "fetch-true"}
              onChange={(e) => setSelectedProviders(e.target.value)}
            />

            <hr />

           
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#00509D" }}
              onClick={handleProceed}
            >
              Proceed to Checkout
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default FAQs;
