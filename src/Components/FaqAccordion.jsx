import { Accordion } from "react-bootstrap";
import { IoMdDoneAll } from "react-icons/io";

const FaqAccordion = ({ faqList }) => {
  if (!faqList || faqList.length === 0) {
    return <p className="text-center text-muted">No FAQs available.</p>;
  }

  return (
    <Accordion defaultActiveKey="" className="text-start border-0">
      {faqList.map((faq, index) => (
        <Accordion.Item key={index} eventKey={index.toString()} className="accor py-4">
          <Accordion.Header>
            <h6 className="dark fw-bold mb-0">{faq.question}</h6>
          </Accordion.Header>
          <Accordion.Body>
            <ul className="list-unstyled text-secondary">
              {faq.points.map((point, idx) => (
                <li key={idx}>
                  <IoMdDoneAll className="text-success me-2" style={{ width: "22px", height: "22px" }} />
                  {point}
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
