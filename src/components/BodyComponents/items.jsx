import ItemCard from "./Itemcard";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../store/firebaseContext";
import { useContext, useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";

const Items = () =>{
    const { db } = useContext(FirebaseContext);
    const [ products, setProducts ] = useState([]);
    let productsData = []
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(query(collection(db, 'products')));
        
                querySnapshot.forEach(doc => {
                    productsData.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                setProducts(productsData);
            } catch (error) {
              console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    })
    return(
        <div className="item-container px-20 z-0">
            <div className="content-div">
                <h1>Fresh recommendations</h1>
                <div className="item-card flex gap-3 flex-wrap">
                    {products.map((product, index) => (
                        <Link to={`/product?productId=${product.id}`} key={index}>
                            <ItemCard products={product} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Items;