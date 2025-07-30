import { useService } from "./context/ServiceContext";

const TandC = () => {
  const { service, loading } = useService();

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!service) return <div className="text-center my-5">No service data available.</div>;

  const termsHTML = service.serviceDetails?.termsAndConditions;

  return (
    <div className="mx-2 mx-lg-5 mb-4">
      <hr />
      <h5 className="fw-bold py-2" style={{ textDecoration: 'underline' }}>Terms And Conditions</h5>

      {termsHTML ? (
        <div
          className="text-secondary"
          dangerouslySetInnerHTML={{ __html: termsHTML }}
        />
      ) : (
        <div className="text-muted">No terms and conditions provided.</div>
      )}
    </div>
  );
};

export default TandC;
