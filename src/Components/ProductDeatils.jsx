import { Col, Container, Row } from "react-bootstrap";
import Banner from "../assets/Black Modern Grand Opening Store Outdoor Banner.png";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { useService } from "./context/ServiceContext";

const ProductDetails = () => {
   const { services, loadingServices, errorServices } = useService(); // 👈 accessing context

  // Log services to the console
  console.log("All Services:", services);
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
        <Col md={7} className="my-2">
          <img src={Banner} className="w-100 h-100 shadow" alt="Banner" />
        </Col>

        <Col md={4} className="p-lg-5 shadow rounded bg-white my-2">
          <h5 className="fw-bold">OPPO A3x (Ocean Blue, 64 GB) (4 GB RAM)</h5>

          <p className="d-flex align-items-center text-white mb-1 py-3">
            <Link to="/review" className="text-decoration-none d-flex align-items-center">
              <span className="ms-2 px-2 fw-bold blue fs-5">
                4.5 <IoIosStar className="mx-1 mb-1" />
              </span>
              <span className="text-secondary ms-2"> & 55 Reviews</span>
            </Link>
          </p>

          <p>
            <span className="fw-bold ms-2 fs-4">₹4900</span>
            <span className="text-success ms-2">
              <span className="text-decoration-line-through text-secondary mx-2">₹7000</span>
              30% Off
            </span>
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quae enim quidem
            quibusdam quasi veniam iure unde tempore fuga eaque.
          </p>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ProductDetails;
