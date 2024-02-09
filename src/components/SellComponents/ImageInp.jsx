import { useEffect, useRef } from "react";
import "./SellItems.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PropTypes from 'prop-types';

const ImageInputField = ({ index, onImageUpload, allImages, onCloseClick }) => {
    const imageInpRef = useRef();
    const imgDivRef = useRef();
    const closeImgRef = useRef();

    const fileUpload = () => {
        imageInpRef.current.click();
    }

    const handleInpChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = () => {
                const imageUrl = reader.result;
                onImageUpload(imageUrl);
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    const handleCloseClick = () => {
        imgDivRef.current.style.backgroundImage = "";
        imgDivRef.current.style.border = "1px solid gray"; 
        onCloseClick(index);
    }

    useEffect(() => {
        if (allImages[index]) {
            imgDivRef.current.style.backgroundImage = `url("${allImages[index]}")`;
            imgDivRef.current.style.backgroundSize = "cover";
            imgDivRef.current.style.border = "2px solid black"; 
        }
    }, [allImages, index]);

    const showCloseButton = allImages[index] ? { opacity: 1 } : { opacity: 0 };
    const showAddPhotoButton = allImages[index] ? { display: "none" } : { display: "flex" };

    return (
        <>
            <div className="image-upload flex items-center justify-center relative" ref={imgDivRef}>
                <span ref={closeImgRef} style={showCloseButton} onClick={handleCloseClick}> 
                    <IoIosCloseCircleOutline className="absolute top-0 right-0 text-2xl bg-black text-white" />
                </span>
                <input type="file" className="opacity-0 w-1/2 absolute" ref={imageInpRef} onChange={(e) => { handleInpChange(e); }} />
                <button className="flex flex-col items-center" onClick={fileUpload} style={showAddPhotoButton}>
                    <svg width="36px" height="36px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd">
                        <path fill="grey" className="rui-jB92v" d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l-38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                    </svg>
                    <span className="text-gray-400">Add Photo</span>
                </button>
            </div>
        </>
    )
}

ImageInputField.propTypes = {
    index: PropTypes.number,
    onImageUpload: PropTypes.func,
    allImages: PropTypes.array,
    onCloseClick: PropTypes.func
};

export default ImageInputField;
