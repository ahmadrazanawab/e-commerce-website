import Order from "../components/Order";

const Home = () => {
    return (
        <div className="pt-20 pb-4 flex flex-col items-center  bg-slate-300">
            <h4 className="text-2xl font-serif my-2">Admin Panel</h4>
            <div className="flex justify-center flex-wrap">
                <Order />
            </div>
        </div>
    )
}

export default Home;