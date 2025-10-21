import {Outlet} from "react-router-dom"

const Home = function () {
    const divStyle = {
        backgroundImage: `url(https://res.cloudinary.com/dk4hs2cot/image/upload/v1760427461/bzokq6izgshndwjujhzm.jpg)`,
    };


    return (
        <div>
           <Outlet/>
        </div>
    )
};


export default Home;