import "./Body.css";

const FilterNav = () => {
    return(
        <div className="filter-nav-container py-2 px-12 flex">
            <span className="flex items-center text-sm font-semibold gap-3 "> 
                ALL CATEGORIES 
                <button className={`country-dropdown-btn`}>
                    <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path></svg>
                </button>
            </span>
            <ul className="flex gap-4 font-light text-sm pl-3">
                <li>
                    <a href="#">Cars</a>
                </li>
                <li>
                    <a href="#">Motorcycles</a>
                </li>
                <li>
                    <a href="#">Mobile Phones</a>
                </li>
                <li>
                    <a href="#">For Sale; House and Apartments</a>
                </li>
                <li>
                    <a href="#">Scooters</a>
                </li>
                <li>
                    <a href="#">Commercial and Other Vehicles</a>
                </li>
                <li>
                    <a href="#">For Rent: Houses & Apartments</a>
                </li>
            </ul>
        </div>
    )
}

export default FilterNav;