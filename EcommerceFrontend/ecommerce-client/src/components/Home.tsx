import Hero from "../Pages/Hero";
import Product from "../Pages/Product";


const Home = () => {
    return (
        <div className="pt-16 md:h-[200vh] bg-slate-100">
            <Hero/>
            <Product/>
        </div>
    )
};

export default Home;