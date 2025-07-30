import { useService } from "./context/ServiceContext";

const HitW = () => {
  const { service, loading } = useService();

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!service) return <div className="text-center my-5">No service data available.</div>;

  const howItWorksHTML = service.serviceDetails?.howItWorks;

  return (
    <div className="mx-2 mx-lg-5 mb-4">
      <hr />
      <h5 className="fw-bold py-2" style={{ textDecoration: 'underline' }}>How It Works</h5>

      {howItWorksHTML ? (
        <div
          className="text-secondary"
          dangerouslySetInnerHTML={{ __html: howItWorksHTML }}
        />
      ) : (
        <div className="text-muted">No instructions available for how it works.</div>
      )}
    </div>
  );
};

export default HitW;
