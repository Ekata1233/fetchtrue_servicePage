import { useService } from "./context/ServiceContext";

function WhyBizBooster() {
  const { service, loading } = useService();

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!service) return <div className="text-center my-5">No service data available.</div>;

  const whyChoose = service.serviceDetails?.whyChoose;

  return (
    <div className="mx-2 mx-lg-5 mb-4">
      <hr />
      <h5 className="fw-bold py-2" style={{ textDecoration: "underline" }}>Why Fetch True</h5>

      {Array.isArray(whyChoose) && whyChoose.length > 0 ? (
        <div className="text-secondary">
          {whyChoose.map((item, index) => (
            <div key={index} className="mb-4 p-3 border rounded shadow-sm">
              <h6 className="fw-semibold">{item.title}</h6>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid rounded mb-2"
                  style={{ maxHeight: "200px", objectFit: "contain" }}
                />
              )}
              <p>{item.description}</p>

              {Array.isArray(item.extraSections) && item.extraSections.length > 0 && (
                <ul className="ps-3">
                  {item.extraSections.map((sec, i) => (
                    <li key={i}>{sec.description}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted">No reasons provided.</div>
      )}
    </div>
  );
}

export default WhyBizBooster;
