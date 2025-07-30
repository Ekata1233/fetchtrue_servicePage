import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import { useService } from "./context/ServiceContext";

const Description = () => {

  const { service, loading } = useService();

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!service) return <div className="text-center my-5">No service data available.</div>;

  const overviewHTML = service.serviceDetails?.overview;
  return (
    <div className="mx-2 mx-lg-5 mb-4">

      <hr />
      <Row>

        <Col md={12}>
          <h5 className="fw-bold py-2" style={{ textDecoration: "underline" }}>Overview</h5>
          {overviewHTML ? (
            <div
              className="text-secondary"
              dangerouslySetInnerHTML={{ __html: overviewHTML }}
            />
          ) : (
            <div className="text-muted">No overview available for this service.</div>
          )}
        </Col>
      </Row>
    </div>
  );
};


export default Description;
