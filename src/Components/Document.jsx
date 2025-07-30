import { useService } from "./context/ServiceContext";

const Document = () => {
  const { service, loading } = useService();

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!service) return <div className="text-center my-5">No service data available.</div>;

  const documentHTML = service.serviceDetails?.document;

  return (
    <div className="mx-2 mx-lg-5 mb-4">
      <hr />
      <h5 className="fw-bold py-2" style={{ textDecoration: 'underline' }}>Documents</h5>

      {documentHTML ? (
        <div
          className="text-secondary"
          dangerouslySetInnerHTML={{ __html: documentHTML }}
        />
      ) : (
        <div className="text-muted">No document information available.</div>
      )}
    </div>
  );
};

export default Document;
