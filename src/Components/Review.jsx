import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { IoIosStar } from "react-icons/io";
import { FaArrowLeft, FaCheckCircle, FaRegCircle, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

function Review() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [recommendedReviews, setRecommendedReviews] = useState(() => JSON.parse(localStorage.getItem("recommendedReviews")) || {});
    const [recommendedCount, setRecommendedCount] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [modalImages, setModalImages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        setReviews(storedReviews);

        const storedRecommendedCount = Object.values(recommendedReviews).filter(Boolean).length;
        setRecommendedCount(storedRecommendedCount);
        setTotalUsers(storedReviews.length + storedRecommendedCount);
    }, [recommendedReviews]);

    const handleRecommendClick = (index) => {
        setRecommendedReviews(prev => {
            const updated = { ...prev, [index]: !prev[index] };

            const newRecommendedCount = Object.values(updated).filter(Boolean).length;
            setRecommendedCount(newRecommendedCount);
            setTotalUsers(reviews.length + newRecommendedCount);

            localStorage.setItem("recommendedReviews", JSON.stringify(updated));
            localStorage.setItem("recommendedCount", newRecommendedCount);
            localStorage.setItem("totalUsers", reviews.length + newRecommendedCount);
            return updated;
        });
    };

    const recommendPercentage = totalUsers > 0 ? ((recommendedCount / totalUsers) * 100).toFixed(0) : 0;

    let ratings = [
        { rating: "5", count: 0 },
        { rating: "4", count: 0 },
        { rating: "3", count: 0 },
        { rating: "2", count: 0 },
        { rating: "1", count: 0 }
    ];

    let totalRating = 0;
    let totalRatingsCount = 0;
    let totalReviewsCount = 0;

    reviews.forEach(review => {
        if (review.rating) {
            ratings.find(r => r.rating === String(review.rating)).count += 1;
            totalRating += review.rating;
            totalRatingsCount++;
        }
        if (review.reviewText && review.reviewText.trim() !== "") {
            totalReviewsCount++;
        }
    });

    ratings = ratings.map(item => ({ ...item, total: totalRatingsCount }));
    let averageRating = totalRatingsCount > 0 ? (totalRating / totalRatingsCount).toFixed(1) : "0.0";

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
                    <h3 className="fw-bold">{averageRating} <IoIosStar className='mx-1 mb-2 blue ' /></h3>
                    <p className="text-secondary">{totalRatingsCount} Ratings</p>
                    <p>{totalReviewsCount} Reviews</p>
                </Col>
                {totalReviewsCount > 0 && (
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
                return review.reviewText && review.reviewText.trim() !== "" ? (
                    <div key={index} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p className="fw-bold blue">User</p>
                            <div>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} size={20} color={i < review.rating ? '#00509D' : '#e4e5e9'} />
                                ))}
                            </div>
                        </div>
                        <p>{review.reviewText}</p>
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
                        <a
                            style={{ cursor: 'pointer', color: isRecommended ? 'green' : 'black' }}
                            onClick={() => handleRecommendClick(index)}
                        >
                            {isRecommended ? <FaCheckCircle color="green" /> : <FaRegCircle />} &nbsp; Recommended
                        </a>
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
            gridTemplateColumns: "repeat(3, 1fr)", // Default: 3 per row (mobile)
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
            gridTemplateColumns: "repeat(6, 1fr)", // 6 per row (large screens)
            gridTemplateRows: "repeat(3, auto)", // 3 rows
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
