import "./Body.css";
import FilterNav from "./filterNav";
import Items from "./items";

const Body = () => {
    return(
        <div className="main-body-container">
            <FilterNav/>
            <Items/>
        </div>
        
    );
}

export default Body;