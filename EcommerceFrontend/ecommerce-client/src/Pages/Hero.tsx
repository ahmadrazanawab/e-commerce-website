// import HomeImage from "../assets/Images/homeImg.jpg";
import HomeHeader from "../assets/Images/header-bg.jpg";
const Hero = () => {
    // className="flex sm:flex-row flex-col pt-2 px-4 sm:items-center sm:justify-between justify-center w-full h-[90vh] bg-sky-200"
    return (
        <section className="flex py-2 justify-center w-full h-[90vh]">
            {/* <div className="sm:mx-5 mx-4 sm:my-0 my-2">
                <h4 className="sm:text-2xl text-xl  font-serif">this is title</h4>
                <p className="sm:text-xl text-sm ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, enim eos aut voluptatem incidunt quaerat fuga inventore optio.</p>
                <p className="sm:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, nam odio. Nam?</p>
            </div> */}
            <div className="w-full sm:my-0 my-2">
                <img src={HomeHeader} className="h-[100vh] w-full" alt="No Home Image" />
            </div>
        </section>
    )
};

export default Hero;