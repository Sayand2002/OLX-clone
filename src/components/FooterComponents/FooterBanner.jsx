import "./Footer.css"

const FooterBanner = () => {
    return(
        <div className="footer-banner-container">
            <div className="footer-img"></div>
            <div className="footer-banner-descriptions flex flex-col pr-2">
                <h1 className=" text-4xl font-semibold mt-8">TRY THE OLX APP</h1>
                <p className="text-xl pt-3" style={{fontWeight:"300"}}>Buy, sell and find just about anything using the app on your mobile.</p>
            </div>
            <hr className="vertical-hr"/>
            <div className="footer-banner-buttons flex flex-col justify-center pl-8 gap-3">
                <span className=" font-semibold text-sm">GET YOUR APP TODAY</span>
                <span className="flex gap-2">
                    <img src="./src/assets/appstore_2x.webp" alt=""/>
                    <img src="./src/assets/playstore_2x.webp" alt="" />
                </span>
            </div>
        </div>
    )
}

export default FooterBanner;