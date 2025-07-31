import { useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Offcanvas,
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

  const providerList = ["provider one", "provider two", "provider three"];

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleProceed = () => {
    handleClose();
    navigate("/self-add");
  };

  const faqList =
    service?.serviceDetails?.faq?.length > 0
      ? service.serviceDetails.faq.map((item) => ({
        question: item.question,
        points: [item.answer]
      }))
      : [];

  const modalStyles = {
    transform: "translateY(0)",
    animation: "slideUp 0.4s ease-out",
    "@keyframes slideUp": {
      from: { transform: "translateY(100%)", opacity: 0 },
      to: { transform: "translateY(0)", opacity: 1 }
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!service) {
    return <div className="text-center my-5">No service data available.</div>;
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

        {/* Modal with inline animation */}
    <Offcanvas
  show={showModal}
  onHide={handleClose}
  placement="bottom"
  backdrop={true}
  scroll={true}
  style={{
    height: "70vh", // 👈 Increased height
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    overflowY: "auto",
    transition: "transform 0.4s ease-in-out",
  }}
>
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>Provider Available</Offcanvas.Title>
  </Offcanvas.Header>
<Offcanvas.Body>
  {/* Fetch True Block */}
 <div
  className="d-flex align-items-center justify-content-between mb-3 p-3 rounded shadow-sm"
  style={{
    background: "linear-gradient(135deg, #B3D8FF, #D6ECFF)", // faint gradient
    color: "#003366", // readable darker text
  }}
>
  {/* Image */}
  <div
    className="p-1 bg-white rounded-circle me-3"
    style={{
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src="/fetch-true.jpg"
      alt="Fetch True"
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  </div>

  {/* Info section */}
  <div className="flex-grow-1">
    <h6 className="mb-1 fw-bold">Fetch True</h6>
    <div className="d-flex flex-wrap align-items-center gap-3">
      <div style={{ textDecoration: "line-through", color: "#666" }}>
        ₹1000
      </div>
      <div className="fw-bold">₹800</div>
      <div className="badge bg-success-subtle text-success border border-success">
        20% OFF
      </div>
      <div className="badge bg-success-subtle text-success border border-success">
        20% Commission
      </div>
    </div>
  </div>

  {/* Radio button */}
  <div>
    <Form.Check
      type="radio"
      name="providerOptions"
      value="fetch-true"
      checked={selectedProviders === "fetch-true"}
      onChange={(e) => setSelectedProviders(e.target.value)}
    />
  </div>
</div>


  {/* Dynamic Providers */}
  {providerList.map((provider, index) => (
    <div
      key={index}
      className="d-flex align-items-center justify-content-between mb-3 p-3 rounded shadow-sm bg-white border"
    >
      {/* Image */}
      <div
        className="p-1 bg-light rounded-circle border me-3"
        style={{
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/provider.jpg"
          alt={provider}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-grow-1">
        <h6 className="mb-1 fw-bold">{provider}</h6>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div style={{ textDecoration: "line-through", color: "#888" }}>
            ₹1200
          </div>
          <div className="fw-bold text-dark">₹900</div>
          <div className="badge bg-success-subtle text-success border border-success">
            25% OFF
          </div>
          <div className="badge bg-success-subtle text-success border border-success">
            20% Commission
          </div>
        </div>
      </div>

      {/* Radio */}
      <div>
        <Form.Check
          type="radio"
          name="providerOptions"
          value={provider}
          checked={selectedProviders === provider}
          onChange={(e) => setSelectedProviders(e.target.value)}
        />
      </div>
    </div>
  ))}

  {/* Buttons */}
  <div className="d-flex justify-content-end gap-2 mt-4">
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button style={{ backgroundColor: "#00509D" }} onClick={handleProceed}>
      Proceed to Checkout
    </Button>
  </div>
</Offcanvas.Body>






</Offcanvas>



      </Container>
    </div>
  );
}

export default FAQs;
