import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoIosStar } from "react-icons/io";
import logo from "../assets/depositphotos_61243831-stock-photo-letter-s-logo.jpg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { AiOutlineDownload } from "react-icons/ai";

const Description = () => {
 

  return (
<div className="mx-2 mx-lg-5 mb-4">

      <hr />
      <Row>
        
        <Col md={12}>
          <h5 className="fw-bold py-2" style={{ textDecoration: "underline" }}>Overview</h5>
          <ul className="text-secondary">
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, quasi?</li>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
          </ul>
          {/* PDF Download Link */}
          {/* <ul className="list-unstyled text-secondary">
            <li className="">
              <a href="/sample.pdf" download="Product_Details.pdf" className="d-flex align-items-center  ">
                For More Info Download The PDF
                <AiOutlineDownload className="ms-2 fs-5 text-primary" />
              </a>
            </li>
          </ul> */}
        </Col>
      </Row>
    </div>
  );
};

Description.propTypes = {
  setDiscountedPrice: PropTypes.func.isRequired,
};

export default Description;
