import ItemCard from "./Itemcard";
import { Link } from "react-router-dom";

const Items = () =>{
    return(
        <div className="item-container px-24 z-0">
            <div className="content-div">
                <h1>Fresh recommendations</h1>
                <div className="item-card flex gap-4">
                    {
                       Array.from({ length: 4 }, (_, index) => (
                        <Link to={'/product'} key={index}>
                            <ItemCard key={index} />
                        </Link>
                      ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Items;