import "./Body.css";
import FilterNav from "./filterNav";
import Items from "./items";
// import Footer from "../FooterComponents/FooterMain"

const Body = () => {
    return(
        <div className="main-body-container">
            <FilterNav/>
            <Items/>
            {/* <Footer/> */}
        </div>
        
    );
}

export default Body;