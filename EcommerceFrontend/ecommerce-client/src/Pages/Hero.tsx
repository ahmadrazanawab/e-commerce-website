// import HomeImage from "../assets/Images/homeImg.jpg";
import { Link } from "react-router-dom";
import HomeHeader from "../assets/Images/header-bg.jpg";
const Hero = () => {
    // className="flex sm:flex-row flex-col pt-2 px-4 sm:items-center sm:justify-between justify-center w-full h-[90vh] bg-sky-200"
    return (
        <section className="flex py-2 justify-center w-full md:h-[90vh]">
            {/* <div className="sm:mx-5 mx-4 sm:my-0 my-2">
                <h4 className="sm:text-2xl text-xl  font-serif">this is title</h4>
                <p className="sm:text-xl text-sm ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, enim eos aut voluptatem incidunt quaerat fuga inventore optio.</p>
                <p className="sm:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, nam odio. Nam?</p>
            </div> */}
            <div className="w-full sm:my-0 my-2 opacity-90 ">
                <img src={HomeHeader} className="md:h-[100vh] h-[50vh] w-full" alt="No Home Image" />
            </div>
            <div className="flex flex-col md:mx-0 mx-3  md:w-[800px] text-white absolute md:top-60 sm:top-44 top-36 justify-center items-center">
                <h4 className="my-1 md:text-4xl sm:text-2xl text-xl font-semibold">Welcome to Apna Shope</h4>
                <p className="mt-1 text-center">
                    sunt quasi adipisci nihil quos, quae enim in, fugiat tenetur. Lorem, ipsum dolor sit amet consectetur.
                </p>
                <p className="mb-1 text-center">
                     quae enim in, fugiat tenetur. Lorem, ipsum dolor sit amet consectetur.
                </p>
                <Link to="/product"
                    className="bg-green-700 my-4 text-white px-2 py-1 rounded border-[1px] border-slate-200">
                    Shoping Now
                </Link>
            </div>
        </section>
    )
};

export default Hero;