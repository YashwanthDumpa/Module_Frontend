// import LandD from "./LandDScreen";
import '../Styles/home.css';
import Training from "./Training";
import Nav from "./nav";

const Home = () => {

    return (

        <div>
            <div className="navigation">
                <Nav />
            </div>
            <div className="training">
                <Training />
            </div>
        </div>

    )

}

export default Home