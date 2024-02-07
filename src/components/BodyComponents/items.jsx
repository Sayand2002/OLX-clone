import ItemCard from "./Itemcard";

const Items = () =>{
    return(
        <div className="item-container px-24 z-0">
            <div className="content-div">
                <h1>Fresh recommendations</h1>
                <div className="item-card flex gap-4">
                    {
                       Array.from({ length: 4 }, (_, index) => (
                        <ItemCard key={index} />
                      ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Items;