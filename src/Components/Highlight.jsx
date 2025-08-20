import { useService } from "./context/ServiceContext";

const Hightlight = () => {
  const { service, loading } = useService();

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!service) return <div className="text-center my-5">No service data available.</div>;

  const highlights = service.serviceDetails?.highlight;

  return (
    <div className="mx-2 mx-lg-5 mb-4">
      <hr />
      <h5 className="fw-bold py-2" style={{ textDecoration: "underline" }}>Highlihts</h5>

      {Array.isArray(highlights) && highlights.length > 0 ? (
       <div className="row">
  {highlights.map((img, index) => (
    <div className="col-12 mb-3" key={index}>
      <img
        src={img}
        alt={`Highlight ${index + 1}`}
        className="w-100 h-auto object-cover rounded shadow-sm"
      />
    </div>
  ))}
</div>

      ) : (
        <div className="text-muted">No highlights available for this service.</div>
      )}
    </div>
  );
};

export default Hightlight;
