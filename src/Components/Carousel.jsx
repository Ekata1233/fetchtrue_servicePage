import Carousel from 'react-bootstrap/Carousel';
import carimg from '../assets/Black Modern Grand Opening Store Outdoor Banner.png'
const Carousell = () => {
  return (
    <div>
         <div className=" h-50">
        <Carousel>
          <Carousel.Item interval={1000}>
            <img src={carimg} className='caraimg'/>
            
          </Carousel.Item>
          <Carousel.Item>
          <img src={carimg} className='caraimg'/>
         
          </Carousel.Item>
          <Carousel.Item>
          <img src={carimg} className='caraimg'/>
          
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  )
}

export default Carousell