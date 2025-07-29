import { Container } from "react-bootstrap"

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiMail } from "react-icons/fi";
function Footer() {
  return (
    <div>
        <div className="w-100 blue-bg text-white mt-5">
           <Container className="py-4">
           <h2 className="fw-bold mb-3">For More Information</h2>
           <p className=""> <FiMail className="me-2" style={{width:"20px", height:"20px"}}/>info@bizbooster2x.com</p>
           <p className=""> <FaPhoneAlt className="me-2" style={{width:"20px", height:"20px"}}/>+91 9309517500</p>

           <p className=""> <TbWorld className="me-2" style={{width:"20px", height:"20px"}}/> www.bizbooster2x.com.</p>

           <div className="mt-2">
              

                <a href="https://www.facebook.com/share/1BXEeQnmYF/" target="_blank" rel="noopener noreferrer">
                  <div className="social-icon-container" style={{ position: 'relative', display: 'inline-block' }}>
                    <p style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: '#1877F2' }}>

                    </p>
                    <FaFacebookF
                      className="social-icon border border-1 rounded-circle p-2 me-2"
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
                  <div className="social-icon-container" style={{ position: 'relative', display: 'inline-block' }}>
                    <p style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: '#0A66C2' }}>

                    </p>
                    <FaLinkedinIn
                      className="social-icon border border-1 rounded-circle p-2 me-2"
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
                  <div className="social-icon-container" style={{ position: 'relative', display: 'inline-block' }}>
                    <p style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: '#E1306C' }}>

                    </p>
                    <FaInstagram
                      className="social-icon border border-1 rounded-circle p-2 me-2"
                      style={{
                        width: "35px",
                        height: "35px",
                        color: "#E1306C",
                        borderColor: "#E1306C",
                      }}
                    />
                  </div>
                </a>

                <a href=" https://wa.me/919309517500" target="_blank" rel="noopener noreferrer">
                  <div className="social-icon-container" style={{ position: 'relative', display: 'inline-block' }}>
                    <p style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: '#25D366' }}>

                    </p>
                    <IoLogoWhatsapp
                      className="social-icon border border-1 rounded-circle p-2 me-2"
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

           </Container>
        </div>
    </div>
  )
}

export default Footer