import { useService } from "./context/ServiceContext";

const Benifits = () => {
  const { service, loading } = useService();

  console.log("serive detais  ; ", service)

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!service) return <div className="text-center my-5">No service data available.</div>;

   const benefitsHTML = service.serviceDetails?.benefits;
  return (
    <div>
      <div className="mx-2 mx-lg-5 mb-4">

        <hr />
        <h5 className="fw-bold py-2" style={{ textDecoration: 'underline' }}>Benifits</h5>
        {benefitsHTML ? (
          <div
            className="text-secondary"
            dangerouslySetInnerHTML={{ __html: benefitsHTML }}
          />
        ) : (
          <div className="text-muted">No benefits listed for this service.</div>
        )}

      </div>
    </div>
  )
}

export default Benifits