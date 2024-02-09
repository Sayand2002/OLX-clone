import "./SellItems.css";
import { IoMdArrowBack } from "react-icons/io";
import ImageInputField from "./ImageInp";
import { useState } from "react";
import { State }  from 'country-state-city';

const SellItems = () => {
    const [allImages, setAllImages] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const handleInputChange = (e, setState) => {
        setState(e.target.value);
    }

    const indianStates = State.getStatesOfCountry('IN');

    const handleImageUpload = (imageUrl) => {
        setAllImages((prevImages) => [...prevImages,imageUrl]);
    };

    const handleRemove = (index) => {
        setAllImages((prev) => prev.filter((_, i)=> i !== index ));
    }

    return(
        <div className="sellitems-container">
            <div className="nav">
                <IoMdArrowBack className="text-2xl"/>
            </div>
            <div className="form-container flex justify-center">
                <h1 className="text-2xl font-semibold py-5 z-10 absolute top-16">POST YOUR AD</h1>
                <form className="p-0" onSubmit={(e)=>{e.preventDefault()}}> 
                    <h1 className=" font-semibold text-xl pb-0 p-8">INCLUDE SOME DETAILS</h1>
                    <div className="p-8 pb-0">
                        <label htmlFor="title">Ad title*</label><br/>
                        <input type="text" name="title" className="textfiled" value={title} onChange={(e) => {handleInputChange(e, setTitle)}}/>
                        <span className="flex gap-10 w-3/5">
                            <p className=" text-xs">Mention the key features of your item(e.g. brand,model,age,type)</p>
                            <p className="text-xs">0/70</p>
                        </span>
                    </div>
                    <br/>
                    <div className="pl-8 pb-7">
                        <label htmlFor="description">Description*</label><br/>
                        <textarea name="desciption" cols="45" rows="3" value={description} onChange={(e) => {handleInputChange(e, setDescription)}} className="px-5 py-2"></textarea>
                        <span className="flex w-3/5 justify-between">
                            <p className=" text-xs">Include condition,feature and reason for selling.</p>
                            <p className="text-xs pr-5">3/4000</p>
                        </span>
                    </div>
                    <hr />
                    <div className="pl-8 pb-7">
                    <h1 className=" font-semibold text-xl pt-6 pb-3">SELL A PRICE AND CATEGORY</h1>
                        <label htmlFor="description">Price*</label><br/>
                        <input type="number" name="price" className="textfiled" value={price} onChange={(e) => {handleInputChange(e, setPrice)}}/>
                        <span className="flex w-3/5 justify-between">
                            <p className=" text-xs">error div</p>
                        </span>
                        <label htmlFor="description">Category*</label><br/>
                        <input type="number" name="price" className="textfiled" value={category} onChange={(e) => {handleInputChange(e, setCategory)}}/>
                        <span className="flex w-3/5 justify-between">
                            <p className=" text-xs">error div</p>
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
                            <p className=" text-xs">error div</p>
                        </span>
                    </div>
                    <hr />
                    <div className="p-8">
                        <button className="postBtn" disabled>
                            Post now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SellItems;