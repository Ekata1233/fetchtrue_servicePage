import { useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner
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

  const providerList = ["provider one","provider two","provider three"]

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleProceed = () => {
    handleClose();
    navigate("/self-add");
  };

  // Extract dynamic FAQ from serviceDetails
  const faqList =
    service?.serviceDetails?.faq?.length > 0
      ? service.serviceDetails.faq.map((item) => ({
        question: item.question,
        points: [item.answer] // Wrap answer in array to match your design
      }))
      : [];

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center my-5">
        No service data available.
      </div>
    );
  }

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
            {faqList.length > 0 ? (
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
            ) : (
              <p className="text-center text-muted">No FAQs available.</p>
            )}
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

            {providerList.map((provider, index) => (
              <Form.Check
                key={index}
                type="radio"
                label={provider}
                name="providerOptions"
                value={provider}
                checked={selectedProviders === provider}
                onChange={(e) => setSelectedProviders(e.target.value)}
                className="mb-2"
              />
            ))}
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
