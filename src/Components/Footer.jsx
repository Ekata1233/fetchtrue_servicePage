import React from 'react';
import { Container } from "react-bootstrap";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa';
import { TbWorld } from "react-icons/tb";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  return (
    <footer
      className="footer text-white pt-5 pb-4"
      style={{
        background: 'linear-gradient(to right, #003f7f, #00509D, #007bbd)',
      }}
    >
      <Container>
        <div className="row text-md-left">

          {/* FetchTrue Intro */}
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">FetchTrue</h5>
            <p>
              Welcome to FetchTrue! We are dedicated to helping you build a secure financial future and make smart investment decisions. Join us on the path to financial success!
            </p>

            {/* Social Icons */}
            <div className="mt-2">
              <a href="https://www.facebook.com/share/1BXEeQnmYF/" target="_blank" rel="noopener noreferrer">
                <div style={{ display: 'inline-block' }}>
                  <FaFacebookF
                    className="border border-1 rounded-circle p-2 me-2"
                    style={{
                      width: "35px",
                      height: "35px",
                      color: "#1877F2",
                      borderColor: "#1877F2",
                    }}
                  />
                </div>
              </a>

              <a href="https://www.linkedin.com/company/ftfl-technology-pvt-ltd/posts?lipi=urn%3Ali%3Apage%3Ad_flagship3_company_admin%3B74v7ipTfSPiXlWl47Q2SSw%3D%3D" target="_blank" rel="noopener noreferrer">
                <div style={{ display: 'inline-block' }}>
                  <FaLinkedinIn
                    className="border border-1 rounded-circle p-2 me-2"
                    style={{
                      width: "35px",
                      height: "35px",
                      color: "#0A66C2",
                      borderColor: "#0A66C2",
                    }}
                  />
                </div>
              </a>

              <a href="https://www.instagram.com/biz.booster.2x?igsh=MXRmcmViYWVjNXE2YQ==" target="_blank" rel="noopener noreferrer">
                <div style={{ display: 'inline-block' }}>
                  <FaInstagram
                    className="border border-1 rounded-circle p-2 me-2"
                    style={{
                      width: "35px",
                      height: "35px",
                      color: "#E1306C",
                      borderColor: "#E1306C",
                    }}
                  />
                </div>
              </a>

              <a href="https://wa.me/919309517500" target="_blank" rel="noopener noreferrer">
                <div style={{ display: 'inline-block' }}>
                  <IoLogoWhatsapp
                    className="border border-1 rounded-circle p-2 me-2"
                    style={{
                      width: "35px",
                      height: "35px",
                      color: "#25D366",
                      borderColor: "#25D366",
                    }}
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Official Info</h5>
            <p><FaMapMarkerAlt className="me-2" /> Office no.307, 3rd Floor, Amanora Chamber, Amanora Mall, Hadapsar, Pune- 411028</p>
            <p><FaEnvelope className="me-2" /> info@fetchtrue.com</p>
            <p><FaPhoneAlt className="me-2" /> +91 9309517500</p>
            <p><TbWorld className="me-2" />
              <a href="http://www.fetchtrue.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
                www.fetchtrue.com
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Quick Links</h5>
            <p><a href="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</a></p>
            <p><a href="/return-policy" className="text-white text-decoration-none">Return & Refund Policy</a></p>
            <p><a href="/terms&conditons" className="text-white text-decoration-none">Terms & Conditions</a></p>
            <p><a href="/cancellation-policy" className="text-white text-decoration-none">Cancellation Policy</a></p>
            <p><a href="/about-us" className="text-white text-decoration-none">About Us</a></p>

          </div>

        </div>

        <hr className="mb-4" />

        {/* Bottom row */}
        <div className="row align-items-center">
          <div className="col-md-6 col-lg-6">
            <p className="text-white mb-0">© 2023 All rights Reserved | <strong>FetchTrue</strong></p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
