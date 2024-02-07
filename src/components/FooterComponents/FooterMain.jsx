import "./Footer.css";
import FooterBanner from "./FooterBanner";
import FooterList from "./FooterList";

const Footer = () => {
    return(
        <div className="footer-main-div">
            <FooterBanner/>
            <FooterList/>
        </div>
    )
}

export default Footer;