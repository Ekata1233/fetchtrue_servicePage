import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function WriteReview() {
    const navigate = useNavigate();
    
    const [rating, setRating] = useState(() => JSON.parse(localStorage.getItem("tempRating")) || 1);
    const [reviewText, setReviewText] = useState(() => localStorage.getItem("tempReview") || '');
    const [images, setImages] = useState(() => JSON.parse(localStorage.getItem("tempImages")) || []);

    const handleStarClick = (currentRating) => {
        setRating(rating === currentRating && currentRating > 1 ? currentRating - 1 : currentRating);
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = [];

        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                newImages.push(reader.result);
                if (newImages.length === files.length) {
                    setImages(prevImages => [...prevImages, ...newImages]);
                }
            };
        });
    };

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        
        let newReview = {};
        if (rating > 0) newReview.rating = rating;
        if (reviewText.trim() !== '') newReview.reviewText = reviewText;
        if (images.length > 0) newReview.images = images;
        
        if (Object.keys(newReview).length === 0) {
            alert("Please fill at least one field before posting.");
            return;
        }

        localStorage.setItem("reviews", JSON.stringify([newReview, ...storedReviews]));
        setRating(1);
        setReviewText('');
        setImages([]);
        alert("Review Posted Successfully!");
        navigate("/review");
    };

    return (
        <Container>
            <p className='text-secondary fs-3'>Score</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                        {[...Array(5)].map((_, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <label>
                                    <input type='radio' name='rating' value={index + 1} style={{ display: 'none' }} />
                                    <FaStar
                                        size={30}
                                        color={index + 1 <= rating ? '#00509D' : '#e4e5e9'}
                                        onClick={() => handleStarClick(index + 1)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Form>
                <Form.Group className="mb-3 mt-5">
                    <Form.Label>Review</Form.Label>
                    <Form.Control as="textarea" rows={3} value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                </Form.Group>
            </Form>

            <div>
                <p>Upload Photos</p>
                <div style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                    <label style={{ cursor: 'pointer' }}>
                        Drag & Drop Images Here or Click to Upload
                        <input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            style={{ display: 'none' }} 
                        />
                    </label>
                </div>
                <div className="image-preview" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', marginTop: '10px' }}>
                    {images.map((image, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                            <img src={image} alt="preview" width={100} height={100} style={{ objectFit: 'cover', borderRadius: '5px' }} />
                            <button onClick={() => removeImage(index)} style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Button className="w-100 bg-white text-secondary rounded rounded-5 py-2 mb-5 mt-5" onClick={handleSubmit}>Post</Button>
        </Container>
    );
}

export default WriteReview;
