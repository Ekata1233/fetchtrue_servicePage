import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { IoIosStar } from "react-icons/io";
import { FaArrowLeft, FaCheckCircle, FaRegCircle, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { useService } from "./context/ServiceContext";

function Review() {
    const navigate = useNavigate();
    const [recommendedReviews, setRecommendedReviews] = useState(() => JSON.parse(localStorage.getItem("recommendedReviews")) || {});
    const [recommendedCount, setRecommendedCount] = useState(0);
    const [modalImages, setModalImages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const {
        reviews = [],
        averageRating = 0,
        totalReviews = 0,
        ratingDistribution = {},
        loading
    } = useService();

    useEffect(() => {
        const storedRecommendedCount = Object.values(recommendedReviews).filter(Boolean).length;
        setRecommendedCount(storedRecommendedCount);
    }, [recommendedReviews]);

    const handleRecommendClick = (index) => {
        setRecommendedReviews(prev => {
            const updated = { ...prev, [index]: !prev[index] };
            const newRecommendedCount = Object.values(updated).filter(Boolean).length;
            localStorage.setItem("recommendedReviews", JSON.stringify(updated));
            setRecommendedCount(newRecommendedCount);
            return updated;
        });
    };

    const recommendPercentage = totalReviews > 0 ? ((recommendedCount / totalReviews) * 100).toFixed(0) : 0;

    const ratings = [5, 4, 3, 2, 1].map((star) => ({
        rating: String(star),
        count: ratingDistribution[star] || 0,
        total: totalReviews
    }));

    if (loading) return <p>Loading reviews...</p>;

    return (
        <Container>
            <FaArrowLeft className="blue" /> <a href="/" className="blue">Back to Home</a>
            <h3 className="fw-bold mt-4">Ratings & Reviews</h3>

            <Row className="my-lg-5">
                <Col sm={12} lg={6}>
                    <ResponsiveContainer height={200} className="barcol">
                        <BarChart data={ratings} layout="vertical">
                            <XAxis type="number" domain={[0, 'dataMax']} hide />
                            <YAxis dataKey="rating" type="category" width={100} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#00509D" barSize={10} stackId="stack" />
                            <Bar dataKey="total" fill="#D3D3D3" barSize={10} stackId="stack" />
                        </BarChart>
                    </ResponsiveContainer>
                </Col>
                <Col className="my-3">
                    <h3 className="fw-bold">{averageRating?.toFixed(1)} <IoIosStar className='mx-1 mb-2 blue ' /></h3>
                    <p className="text-secondary">{totalReviews} Ratings</p>
                    <p>{reviews.length} Reviews</p>
                </Col>
                {reviews.length > 0 && (
                    <Col>
                        <h3>{recommendPercentage}%</h3>
                        <p style={{ display: 'flex', alignItems: 'center' }}>
                            <FaCheckCircle color="green" /> &nbsp; Recommended
                        </p>
                    </Col>
                )}
            </Row>

            <Button className="w-100 bg-white text-secondary rounded rounded-5 py-2 mb-5" onClick={() => navigate("/writeareview")}>Write a Review</Button>

            <h3>Reviews</h3>

            {reviews.length > 0 ? reviews.map((review, index) => {
                const isRecommended = recommendedReviews[index] || false;
                return review.comment && review.comment.trim() !== "" ? (
                    <div key={index} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p className="fw-bold blue">{review.user?.email || "User"}</p>
                            <div>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} size={20} color={i < review.rating ? '#00509D' : '#e4e5e9'} />
                                ))}
                            </div>
                        </div>
                        <p>{review.comment}</p>

                        <Col>
                            {review.images && review.images.length > 0 && (
                                <div className="image-preview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {review.images.slice(0, 3).map((image, i) => (
                                        <img key={i} src={image} alt="review" width={80} height={80} style={{ objectFit: 'cover', borderRadius: '5px' }} />
                                    ))}
                                    {review.images.length > 3 && (
                                        <div
                                            onClick={() => { setModalImages(review.images); setShowModal(true); }}
                                            style={{
                                                width: '80px', height: '80px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                background: 'rgba(0, 0, 0, 0.5)', color: 'white',
                                                fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer'
                                            }}
                                        >
                                            +{review.images.length - 3}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Col>
                        {/* <a
                            style={{ cursor: 'pointer', color: isRecommended ? 'green' : 'black' }}
                            onClick={() => handleRecommendClick(index)}
                        >
                            {isRecommended ? <FaCheckCircle color="green" /> : <FaRegCircle />} &nbsp; Recommendeddsdsd
                        </a> */}
                    </div>
                ) : null;
            }) : <p>No reviews yet.</p>}

            {/* Modal for showing all images */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Body>
                    <div
                        style={{
                            display: "grid",
                            gap: "10px",
                            justifyContent: "center",
                            overflowY: "auto",
                            maxHeight: "400px",
                            padding: "10px",
                            gridTemplateColumns: "repeat(3, 1fr)",
                        }}
                        className="d-grid d-md-none"
                    >
                        {modalImages.map((image, i) => (
                            <img
                                key={i}
                                src={image}
                                style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                            />
                        ))}
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gap: "10px",
                            justifyContent: "center",
                            overflowY: "auto",
                            maxHeight: "400px",
                            padding: "10px",
                            gridTemplateColumns: "repeat(6, 1fr)",
                            gridTemplateRows: "repeat(3, auto)",
                        }}
                        className="d-none d-md-grid"
                    >
                        {modalImages.map((image, i) => (
                            <img
                                key={i}
                                src={image}
                                style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                            />
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
}


export default Review;
