import { Offcanvas, Form, Button } from "react-bootstrap";
import { useService } from "./context/ServiceContext";

const ProviderSelection = ({
  show,
  handleClose,
  handleProceed,
  service,
  providers,
  // selectedProviders,
  // setSelectedProviders
}) => {

  const { selectedProviderId, setSelectedProviderId, providerReviews } = useService();

  const getProviderRatingSummary = (providerId) => {
    const providerReviewsList = providerReviews.reviews.filter(r => r.provider === providerId);
    if (providerReviewsList.length === 0) return null;

    const avg =
      providerReviewsList.reduce((acc, r) => acc + r.rating, 0) /
      providerReviewsList.length;

    return {
      averageRating: avg.toFixed(1),
      total: providerReviewsList.length,
    };
  };


  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      scroll
      backdrop
      style={{
        height: "70vh",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        overflowY: "auto",
        transition: "transform 0.4s ease-in-out",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Available Provider's</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* Fetch True Block */}
        <div
          className="d-flex align-items-center justify-content-between mb-3 p-3 rounded shadow-sm"
          style={{
            background: "linear-gradient(135deg, #B3D8FF, #D6ECFF)",
            color: "#003366",
          }}
        >
          <div className="p-1 bg-white rounded-circle me-3" style={{ width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/fetch-true.jpg" alt="Fetch True" style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
          </div>
          <div className="flex-grow-1">
            <h6 className="mb-1 fw-bold">Fetch True</h6>
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div style={{ textDecoration: "line-through", color: "#666" }}>₹{service?.price}</div>
              <div className="fw-bold">₹{service?.discountedPrice}</div>
              <div className="badge bg-success-subtle text-success border border-success">{service?.discount}% OFF</div>

            </div>
          </div>
          <Form.Check
            type="radio"
            name="providerOptions"
            value="fetch-true"
            checked={selectedProviderId === "fetch-true"}
            onChange={(e) => setSelectedProviderId(e.target.value)}
          />
        </div>

        {/* Dynamic Providers */}
        {providers.map((provider, index) => (
          <div
            key={provider._id || index}
            className="d-flex align-items-center justify-content-between mb-3 p-3 rounded shadow-sm bg-white border"
          >
            <div className="p-1 bg-light rounded-circle border me-3" style={{ width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={provider?.storeInfo?.logo || "/provider.jpg"} alt={provider.fullName} style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-1 fw-bold">{provider.fullName} [ {provider?.storeInfo?.storeName} ]</h6>
              <div className="d-flex flex-wrap align-items-center gap-3">
                <div style={{ textDecoration: "line-through", color: "#888" }}>₹{service?.price}</div>
                <div className="fw-bold text-dark">₹{service?.discountedPrice}</div>
                <div className="badge bg-success-subtle text-success border border-success">{service?.discount}% OFF</div>
                {/*provider reviews */}
                {(() => {
                  const summary = getProviderRatingSummary(provider._id);
                  return summary ? (
                    <div className="text-muted small">
                      ⭐ {summary.averageRating} ({summary.total} reviews)
                    </div>
                  ) : (
                    <div className="text-muted small">No reviews yet</div>
                  );
                })()}
              </div>
            </div>
            <Form.Check
              type="radio"
              name="providerOptions"
              value={provider._id}
              checked={selectedProviderId === provider._id}
              onChange={(e) => setSelectedProviderId(e.target.value)}
            />
          </div>
        ))}

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button style={{ backgroundColor: "#142eaeff" }} onClick={handleProceed}>Proceed to Checkout</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ProviderSelection;
