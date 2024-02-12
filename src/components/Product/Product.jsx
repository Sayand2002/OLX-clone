import "./Product.css";
import Header from "../HeaderComponents/Header";
import Footer from "../FooterComponents/FooterMain";
import ProductCarousel from "./Carousal";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseContext } from "../../store/firebaseContext";

const ProductInfo = () =>{
    const location = useLocation();
    const [productData, setProductData] = useState(null);
    const { db } = useContext(FirebaseContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams(location.search);
                const productId = queryParams.get("productId");

                const productRef = doc(db, "products", productId);
                const productSnapshot = await getDoc(productRef);
        
                setProductData({ id: productId, ...productSnapshot.data() });
            } catch (error) {
                console.error("Error fetching product data:", error.message);
            }
        };
    
        fetchData();
      });

    return(
        <div className="flex flex-col">
        <Header />
        <div className="product-info-container">
            <div className="carousal-container">
                <div className="carousal-image">
                    <ProductCarousel imgArr={productData?.images}/>
                </div>
                <div className="details flex flex-col ">
                    <div className="p-5">
                        <h1 className="font-semibold text-xl">Category Details</h1>
                        <p className="py-3">{productData?.category}</p>
                    </div>
                    <hr className="mx-5" />
                    <div className="p-5">
                        <h1 className="font-semibold text-xl">Description</h1>
                        <ul>
                            <li>
                                <p className="py-3">{productData?.description}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="description-container">
                <div className="product-data flex flex-col justify-between p-4">
                    <span>
                        <span className="flex justify-between">
                            <h1 className="text-4xl font-semibold">₹ {productData?.price}</h1>
                            <span className="flex gap-4">
                                <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M768 853.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM256 597.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM768 170.667c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333zM768 597.333c-52.437 0-98.688 24.107-130.005 61.312l-213.675-123.392c1.067-7.637 2.347-15.275 2.347-23.253 0-4.779-1.024-9.259-1.408-13.909l218.283-126.037c31.104 33.408 75.179 54.613 124.459 54.613 94.251 0 170.667-76.416 170.667-170.667s-76.416-170.667-170.667-170.667c-94.251 0-170.667 76.416-170.667 170.667 0 14.208 2.261 27.819 5.504 41.003l-205.867 118.912c-30.763-45.013-82.389-74.581-140.971-74.581-94.251 0-170.667 76.416-170.667 170.667s76.416 170.667 170.667 170.667c55.467 0 104.235-26.88 135.424-67.84l209.195 120.747c-2.048 10.539-3.285 21.333-3.285 32.427 0 94.251 76.416 170.667 170.667 170.667s170.667-76.416 170.667-170.667c0-94.251-76.416-170.667-170.667-170.667z"></path></svg>
                                <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path></svg>
                            </span>
                        </span>
                        <p className="pt-3 overflow-ellipsis text-lg">{productData?.title}</p>
                    </span>
                    <span className="flex justify-between">
                        <p className="overflow-hidden w-4/5 h-6">{productData?.state}</p>
                        <p className="w-1/6 h-6 overflow-hidden">24hr</p>
                    </span>
                </div>
                
                <div className="seller-data">
                    <span className="flex items-center justify-between px-4 py-2">
                        <span className="flex items-center gap-3">
                            <img src="./src/assets/avathar.webp" alt="sorry" width={"100rem"}/>
                            <p className=" font-semibold text-black text-lg">Seller Name</p>
                        </span>
                        <svg width="18px" height="18px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"></path></svg>
                    </span>
                    <span className="flex justify-center pt-1">
                        <button className="seller-btn w-full py-2 mx-4">Chat with Seller</button>
                    </span>
                </div>
                <div className="location-data p-5">
                    <h1 className="font-semibold text-black text-lg pb-7">Posted in</h1>
                    <span>{productData?.state}</span>
                </div>
            </div>
        </div>
        <div style={{marginTop:"60rem"}}>
            <Footer/>
        </div>
        </div>
    )
}

export default ProductInfo;