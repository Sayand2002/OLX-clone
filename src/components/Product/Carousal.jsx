import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./Product.css";

const ProductCarousel = () => {
    return(
        <Carousel>
                <div>
                    <img src="./src/assets/admin_bg.jpeg" />
                </div>
                <div>
                    <img src="./src/assets/desk-office.jpg" />
                </div>
                <div>
                    <img src="./src/assets/signup-img.png" />
                </div>
                <div>
                    <img src="./src/assets/image.jpeg" />
                </div>
            </Carousel>
    )
}
export default ProductCarousel;