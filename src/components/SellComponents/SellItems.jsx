import "./SellItems.css";
import { IoMdArrowBack } from "react-icons/io";
import ImageInputField from "./ImageInp";
import { useContext, useRef, useState } from "react";
import { State }  from 'country-state-city';
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../store/firebaseContext";
import { addDoc, collection } from "firebase/firestore";
import ToastContainerWrapper from "../Toast/Toast";
import showToast from "../Toast/showToastMessage";
import { ref, uploadString, getDownloadURL } from "firebase/storage";


const SellItems = () => {
    const [allImages, setAllImages] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const [titleWordCount, setTitleWordCount] = useState(0);
    const [descriptionWordCount, setDescriptionWordCount] = useState(0);

    const [titleRef, descriptionRef, priceRef, categoryRef] = [useRef(), useRef(), useRef(), useRef()];

    const [titleErrorRef, descriptionErrorRef, priceErrorRef, categoryErrorRef, imageErrorRef, stateErrorRef] = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

    const { db, auth, storage } = useContext(FirebaseContext);

    const indianStates = State.getStatesOfCountry('IN');

    const handleInputChange = (e, setState, state, ref) => {
        if(state == title && state.length > 0){
            setTitleWordCount(e.target.value.length);
        }
        if(state == description && description.length > 0){
            setDescriptionWordCount(e.target.value.length);
        }
        validateFields(e.target.value, ref)
        setState(e.target.value);
    }

    const validateFields = (value, ref) => {
        if(value == ""){
            ref.current.style.border = "3px solid red";
        }else{
            ref.current.style.border = "3px solid green";
        }
    }

    const handleImageUpload = (imageUrl) => {
        setAllImages((prevImages) => [...prevImages,imageUrl]);
    };

    const handleRemove = (index) => {
        setAllImages((prev) => prev.filter((_, i)=> i !== index ));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const isTitleValid = validateField(title, titleRef, titleErrorRef, "Ad title is required");
            const isDescriptionValid = validateField(description, descriptionRef, descriptionErrorRef, "Description is required");
            const isPriceValid = validateField(price, priceRef, priceErrorRef, "Price is required");
            const isCategoryValid = validateField(category, categoryRef, categoryErrorRef, "Category is required");
            const isImagesValid = validateImages(allImages, imageErrorRef, "At least one image is required");
            const isStateValid = validateField(selectedState, null, stateErrorRef, "State is required");
    
            if (isTitleValid && isDescriptionValid && isPriceValid && isCategoryValid && isImagesValid && isStateValid) {
                const downloadURLs = [];
                for (const imageFile of allImages) {
                    const imgRef = ref(storage, `images/${auth.currentUser.uid}/${Date.now()}_${Math.random()}`);
                    await uploadString(imgRef, imageFile, 'data_url');
                    const imageURL = await getDownloadURL(imgRef);
                    downloadURLs.push(imageURL);
                }
                const productCollection = collection(db, "products");
                const data = {
                    uid: auth.currentUser.uid,
                    title: title,
                    description: description,
                    price: price,
                    category: category,
                    state: selectedState,
                    images: downloadURLs
                };
                await addDoc(productCollection, data);
                showToast("Product Added Successfully..", "success");
            }
        } catch (error) {
            console.error("Error adding product:", error.message);
            showToast("Error adding product. Please try again later.", "error");
        }
    };
    
    
    const validateField = (value, ref, errorRef, errorMessage) => {
        if (!value || value.trim() === "") {
            if (ref) ref.current.style.border = "3px solid red";
            if (errorRef) {
                errorRef.current.textContent = errorMessage;
                errorRef.current.style.color = "red";
            }
            return false;
        } else {
            if (ref) ref.current.style.border = "3px solid green";
            if (errorRef) errorRef.current.textContent = "";
            return true;
        }
    };
    
    const validateImages = (images, errorRef, errorMessage) => {
        if (images.length === 0) {
            if (errorRef) {
                errorRef.current.textContent = errorMessage;
                errorRef.current.style.color = "red";
            }
            return false;
        } else {
            if (errorRef) errorRef.current.textContent = "";
            return true;
        }
    };
    

    return(
        <div className="sellitems-container">
            <div className="nav z-0">
                <Link to={"/"}>
                    <IoMdArrowBack className="text-2xl"/>
                </Link>
            </div>
            <div className="form-container flex justify-center">
                <h1 className="text-2xl font-semibold py-5 z-10 absolute top-16">POST YOUR AD</h1>
                <form className="p-0" onSubmit={(e)=>{handleSubmit(e)}}> 
                    <h1 className=" font-semibold text-xl pb-0 p-8">INCLUDE SOME DETAILS</h1>
                    <div className="p-8 pb-0">
                        <label htmlFor="title">Ad title*</label><br/>
                        <input type="text" name="title" className="textfiled" ref={titleRef} value={title} onChange={(e) => {handleInputChange(e, setTitle, title, titleRef)}}/>
                        <span className="flex gap-10 w-3/5 justify-between">
                            <span>
                                <p className=" text-xs" ref={titleErrorRef}>Mention the key features of your item(e.g. brand,model,age,type)</p>
                            </span>
                            <p className="text-xs">{titleWordCount}/70</p>
                        </span>
                    </div>
                    <br/>
                    <div className="pl-8 pb-7">
                        <label htmlFor="description">Description*</label><br/>
                        <textarea name="desciption" cols="46" rows="3" ref={descriptionRef} value={description} onChange={(e) => {handleInputChange(e, setDescription, description, descriptionRef)}} className="px-2 py-2"></textarea>
                        <span className="flex w-3/5 justify-between">
                            <p className=" text-xs" ref={descriptionErrorRef}>Include condition,feature and reason for selling.</p>
                            <p className="text-xs pr-5">{descriptionWordCount}/4000</p>
                        </span>
                    </div>
                    <hr />
                    <div className="pl-8 pb-7">
                    <h1 className=" font-semibold text-xl pt-6 pb-3">SELL A PRICE AND CATEGORY</h1>
                        <label htmlFor="description">Price(₹)*</label><br/>
                        <input type="number" name="price" className="textfiled" ref={priceRef} value={price} onChange={(e) => {handleInputChange(e, setPrice, null, priceRef)}}/>
                        <span className="flex w-3/5 justify-between">
                            <p className=" text-xs" ref={priceErrorRef}></p>
                        </span>
                        <label htmlFor="description">Category*</label><br/>
                        <input type="text" name="price" className="textfiled" ref={categoryRef} value={category} onChange={(e) => {handleInputChange(e, setCategory, null, categoryRef)}}/>
                        <span className="flex w-3/5 justify-between">
                            <p className=" text-xs" ref={categoryErrorRef}></p>
                        </span>
                    </div>
                    <hr />
                    <div className="pl-8 pb-7">
                    <h1 className=" font-semibold text-xl pt-6 pb-3">UPLOAD UPTO 12 IMAGES</h1>

                        <div className="imgComponentContainer flex flex-wrap gap-1 w-3/4">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <ImageInputField index={index} onImageUpload={handleImageUpload} allImages={allImages} onCloseClick={handleRemove} key={index}/>
                            ))}
                        </div>
                        <p className=" text-xs" ref={imageErrorRef}></p>
                    </div>
                    <hr />
                    <div className="pl-8 pb-7">
                    <h1 className=" font-semibold text-xl pt-6 pb-3">SELECT LOCATION</h1>
                        <label htmlFor="location">Location(State , district)*</label><br/>
                        <select name="state" value={selectedState} onChange={(e) => {setSelectedState(e.target.value)}} className="p-3 mr-4" style={{border:"1px solid black", borderRadius:"3px", width:"20rem"}}>
                            {indianStates.map((state, index) => (
                                <option key={index} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                        <span className="flex w-3/5 justify-between">
                            <p className=" text-xs" ref={stateErrorRef}></p>
                        </span>
                    </div>
                    <hr />
                    <ToastContainerWrapper/>
                    <div className="p-8">
                        <button className="postBtn">
                            Post now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SellItems;