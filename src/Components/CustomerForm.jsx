import React from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';

const CustomerForm = ({
  formData,
  setFormData,
  customerSubmitting,
  customerError,
  formSaved,
  handleSaveForm,
}) => {
  if (formSaved) return null;

  return (
    <Form style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
      <div className='p-3'>
        <h3 className='text-primary'>Customer Details</h3>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control placeholder="Enter your phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control placeholder="Enter your description" as="textarea" rows={1} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="Enter your address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control placeholder="Enter your state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control placeholder="Enter your city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control placeholder="Enter your country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
            </Form.Group>
          </Col>
        </Row>
        <Button onClick={handleSaveForm} disabled={customerSubmitting}>
          {customerSubmitting ? "Saving..." : "Save Data"}
        </Button>
        {customerError && <p className="text-danger mt-2">{customerError}</p>}
      </div>
    </Form>
  );
};

export default CustomerForm;
