import PropTypes from "prop-types";


const ItemCard = ({ products }) => {
    
    return(
        <div className="card-container">
            <div className="item-img bg-no-repeat" style={{backgroundImage:`url(${products.images[0]})`}}>
                <div className="likeBtn flex justify-end p-1">
                    <button type="button" className="bg-white p-2">
                        <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path></svg>
                    </button>
                </div>
            </div>
            <div className="item-details w-full px-5 py-1 flex flex-col">
                <span className="item-price text-lg font-bold">₹ {products.price}</span>
                <span className="item-name text-sm" style={{color:"rgba(0,47,52,0.64)"}}>{products.title}  </span>
                <span className=" flex justify-between items-end h-8 text-xs pb-1" style={{color:"rgba(0,47,52,0.64)"}}>
                    <span className="location">{products.state} </span>
                    <span className="date">JAN 21</span>
                </span>
            </div>
        </div>
    )
}

ItemCard.propTypes = {
    products: PropTypes.object
  };
  


export default ItemCard;