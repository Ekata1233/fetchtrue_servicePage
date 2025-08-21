import { useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { FaUserPlus, FaShareAlt, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useService } from "./context/ServiceContext";
import ProviderSelection from "./ProviderSelection";
import FaqAccordion from "./FaqAccordion";

function FAQs() {
  const navigate = useNavigate();
  const { service, providers, providersLoading, loading } = useService();
  const [showModal, setShowModal] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState("fetch-true");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleProceed = () => {
    handleClose();
    navigate("/self-add");
  };

  const faqList = service?.serviceDetails?.faq?.map((item) => ({
    question: item.question,
    points: [item.answer],
  })) || [];

  if (loading) return <div className="text-center my-5"><Spinner animation="border" variant="primary" /></div>;
  if (!service) return <div className="text-center my-5">No service data available.</div>;
  if (providersLoading) return <p>Loading providers...</p>;

  return (
    <div className="py-5" style={{ backgroundColor: "rgba(0, 81, 157, 0.04)" }}>
      <Container>
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ textShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)", textDecoration: "underline" }}>
            FAQs
          </h2>
        </div>

        <Row>
          <Col xs={12}>
            <FaqAccordion faqList={faqList} />
          </Col>
        </Row>

        <Container className="mt-5">
          <Row>
            <Col xs={12} md={6} className="my-2">
              <Button
  className="border-none py-2 fw-bold send-btn w-100"
  style={{ backgroundColor: "#00509D" }}
  onClick={handleShow}
>
  <FaShoppingCart className="me-2" />
  Buy Now
</Button>
            </Col>
            <Col xs={12} md={6} className="my-2">
              <Button className="border-none py-2 px-3 fw-bold send-btn w-100" onClick={() => navigate("/share-to-customer")}>
                <FaShareAlt className="me-2" />
                Share To Customer
              </Button>
            </Col>
          </Row>
        </Container>

        <ProviderSelection
          show={showModal}
          handleClose={handleClose}
          handleProceed={handleProceed}
          service={service}
          providers={providers}
        />
      </Container>
    </div>
  );
}

export default FAQs;
