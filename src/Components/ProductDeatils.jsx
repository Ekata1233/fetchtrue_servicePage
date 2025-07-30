import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { useService } from "./context/ServiceContext";

const ProductDetails = () => {
  const { service, loading } = useService();

  console.log("serive detais  ; ", service)

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!service) return <div className="text-center my-5">No service data available.</div>;

  const {
    serviceName,
    discountedPrice,
    price,
    discount,
    totalReviews,
    averageRating,
    thumbnailImage,
    serviceDetails,
  } = service;

  return (
    <div>
      <div className="heading-container product-heading">
        <h2
          className="text-center mt-4 fw-bold mb-4"
          style={{ textShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)" }}
        >
          Product Details
        </h2>
      </div>

      <Container>
        <Row>
          {/* Image Section */}
          <Col md={7} className="my-2">
            <img
              src={thumbnailImage || "/fallback.jpg"}
              className="w-100 h-100 shadow"
              alt={serviceName}
            />
          </Col>

          {/* Details Section */}
          <Col md={4} className="p-lg-5 shadow rounded bg-white my-2">
            <h5 className="fw-bold">{serviceName}</h5>

            <p className="d-flex align-items-center text-white mb-1 py-3">
              <Link
                to="/review"
                className="text-decoration-none d-flex align-items-center"
              >
                <span className="ms-2 px-2 fw-bold blue fs-5">
                  {averageRating || 4.5} <IoIosStar className="mx-1 mb-1" />
                </span>
                <span className="text-secondary ms-2">
                  & {totalReviews || 0} Reviews
                </span>
              </Link>
            </p>

            <p>
              <span className="fw-bold ms-2 fs-4">₹{discountedPrice}</span>
              {discount > 0 && (
                <span className="text-success ms-2">
                  <span className="text-decoration-line-through text-secondary mx-2">
                    ₹{price}
                  </span>
                  {discount}% Off
                </span>
              )}
            </p>

            {service.keyValues?.length > 0 && (
              <div className="mt-3">
                {/* <h6 className="fw-bold">Key Highlights:</h6> */}
                <ul className="ps-3">
                  {service.keyValues.map((item, index) => (
                    <li key={item._id || index}>
                      <strong>{item.key}:</strong> {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetails;
