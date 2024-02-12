import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./Product.css";
import PropTypes from "prop-types";

const ProductCarousel = ({ imgArr }) => {
    return (
        <Carousel>
            {imgArr?.map((url, index) => (
                <div key={index}>
                    <img src={`${url}`} alt={`Product Image ${index + 1}`} />
                </div>
            ))}
        </Carousel>
    );
}

ProductCarousel.propTypes = {
    imgArr: PropTypes.array.isRequired
};

export default ProductCarousel;
