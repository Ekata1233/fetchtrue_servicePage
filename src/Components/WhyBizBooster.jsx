import { useState } from "react";
import { Button, Col, Container, Row, Accordion, Modal, Form } from "react-bootstrap";
import { FaShareAlt, FaUserPlus } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function WhyBizBooster() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
const [fetchTrueChecked, setFetchTrueChecked] = useState(true);
const [selectedProviders, setSelectedProviders] = useState("fetch-true");

const providerList = ["Provider One", "Provider Two", "Provider Three"];



  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleProceed = () => {
    handleClose();
    navigate("/self-add");
  };

const handleProviderChange = (provider) => {
  setSelectedProviders((prev) =>
    prev.includes(provider)
      ? prev.filter((p) => p !== provider)
      : [...prev, provider]
  );
};


  return (
    <div className="pb-5" style={{ backgroundColor: "rgba(0, 81, 157, 0.04)" }}>
      <div className="heading-container product-heading my-5">
        <h2 className="text-center mt-4 fw-bold" style={{ textShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }}>
          Why BizBooster ?
        </h2>
      </div>

      <Container>
        <Row>
          <Col xs={12}>
            <Accordion defaultActiveKey="" className="text-start border-0">
              {[0, 1, 2, 3, 4].map((key) => (
                <Accordion.Item eventKey={key.toString()} className="accor py-4" key={key}>
                  <Accordion.Header>
                    <h6 className="dark fw-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-unstyled text-secondary">
                      {Array(5).fill("").map((_, idx) => (
                        <li key={idx}>
                          <IoMdDoneAll className="text-success me-2" style={{ width: "25px", height: "25px" }} />
                          Lorem ipsum dolor sit amet.
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>

      {/* Button Section */}
      <Container className="mt-4">
        <Row>
          <Col xs={12} md={6} className="my-2">
            <Button
              type="button"
              className="border-none py-2 fw-bold send-btn w-100"
              style={{ backgroundColor: '#00509D' }}
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
              onClick={() => navigate('/share-to-customer')}
            >
              <FaShareAlt className="me-2" />
              Share To Customer
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Self Add Modal */}
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
          <Button  style={{ backgroundColor: '#00509D' }} onClick={handleProceed}>
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WhyBizBooster;
