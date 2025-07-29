import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoIosStar } from "react-icons/io";
import logo from "../assets/depositphotos_61243831-stock-photo-letter-s-logo.jpg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Banner from "../assets/Black Modern Grand Opening Store Outdoor Banner.png";
import { AiOutlineDownload } from "react-icons/ai";

const Description = ({ setDiscountedPrice }) => {
  const originalPrice = 7000;
  const discountPercentage = 30;
  const discountedPrice = Math.round(originalPrice - (originalPrice * discountPercentage) / 100);

  useEffect(() => {
    setDiscountedPrice(discountedPrice);
  }, [setDiscountedPrice, discountedPrice]);

  return (
    <div className="mx-5 mb-4">
      <hr />
      <Row>
        <Col md={7} className="my-2">
          <img src={Banner} className="w-100 h-100 shadow" alt="Banner" />
        </Col>
        <Col md={4} className="p-lg-5 shadow rounded bg-white my-2">
          <h5 className="fw-bold">OPPO A3x (Ocean Blue, 64 GB) (4 GB RAM)</h5>
          <div>
            <p className="d-flex align-items-center text-white mb-1 py-3">
              <Link to="/review" className="text-decoration-none">
                <span className="ms-2 px-2 fw-bold blue fs-5">
                  4.5 <IoIosStar className="mx-1 mb-1" />
                </span>
                <span className="text-secondary ms-2"> & 55 Reviews</span>
              </Link>
            </p>
            <p>
              <span className="fw-bold ms-2 fs-4">₹ {discountedPrice}</span>
              <span className="text-success">
                <span className="text-decoration-line-through mx-2 text-secondary">₹{originalPrice}</span>
                {discountPercentage}% Off
              </span>
            </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quae enim quidem quibusdam quasi veniam iure unde tempore fuga eaque.</p>
          </div>
        </Col>
        <Col md={12}>
          <h5 className="fw-bold py-2" style={{ textDecoration: "underline" }}>Description</h5>
          <ul className="text-secondary">
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, quasi?</li>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
          </ul>
          {/* PDF Download Link */}
          <ul className="list-unstyled text-secondary">
            <li className="">
              <a href="/sample.pdf" download="Product_Details.pdf" className="d-flex align-items-center  ">
                For More Info Download The PDF
                <AiOutlineDownload className="ms-2 fs-5 text-primary" />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

Description.propTypes = {
  setDiscountedPrice: PropTypes.func.isRequired,
};

export default Description;
