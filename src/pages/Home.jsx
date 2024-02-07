import Header from '../components/HeaderComponents/Header';
import Body from '../components/BodyComponents/mainBody';
import Footer from '../components/FooterComponents/FooterMain';

function Home() {
    return (
        <>
            <div className=' overflow-hidden'>
                <Header/>
                <Body/>
                <Footer/>
            </div>
        </>
    )
}

export default Home;
