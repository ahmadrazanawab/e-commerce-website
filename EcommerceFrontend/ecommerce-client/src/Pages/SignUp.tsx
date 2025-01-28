import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../Redux/UserAuth";
import { useState } from "react";
// import { UserAuth } from "../components/ProductItemDefine";

const SignUp = () => {
    const host = "http://localhost:7002";
    const [credential, setCredential] = useState({
        name: '',
        email: '',
        number: '',
        password: ''
    });
    let navigate = useNavigate();
    const formData = {
        name: credential.name,
        email: credential.email,
        number: credential.number,
        password: credential.password
    };
    const dispatch = useDispatch();
    const handleSignUpSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${host}/api/auth/user/v1/userRegister`, formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            console.log(response.data);
            dispatch(signUp(response.data));
            console.log(response.data.token);
            if (response.data.success === true) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                alert("User Create account Succesfully");
            }
            navigate('/signin');
        } catch (error) {
            alert("Credential Invalid Please try again!");
            console.log("Sign Up error...", error);
        }

    }
    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }
    const handleSignUp = () => {
        navigate('/signin');
    }
    return (
        <section className="pt-10 pb-5 bg-slate-100 flex flex-col justify-center items-center">
            <h2 className="text-2xl my-2 font-semibold">Apna Shope</h2>
            <div className="sm:p-4 p-2 mx-2 shadow-sm border-[2px] border-blue-300 rounded bg-white">
                <h1 className="px-2 text-xl font-semibold">Create Account</h1>
                <form action="" onSubmit={handleSignUpSubmit}
                    className="flex flex-col w-[300px] px-2 pb-2">
                    <label htmlFor="name" className="text-sm font-semibold">Name</label>
                    <input type="text"
                        value={credential.name}
                        onChange={onchange}
                        name="name" id="name"
                        className="mb-2 px-2 py-1 hover:bg-blue-100 border-[2px] border-gray-600 focus:ring-blue-500 focus:border-blue-500 outline-none rounded"
                        placeholder="Enter your name" />
                    <label htmlFor="name" className="text-sm font-semibold">Email</label>
                    <input type="email"
                        value={credential.email}
                        onChange={onchange}
                        name="email" id="email"
                        className="mb-2 px-2 py-1 hover:bg-blue-100 border-[2px] border-gray-600 focus:ring-blue-500 focus:border-blue-500 outline-none rounded"
                        placeholder="Enter your email" />
                    <label htmlFor="name" className="text-sm font-semibold">Mobile No</label>
                    <input type="number"
                        value={credential.number}
                        onChange={onchange}
                        name="number" id="number"
                        className="mb-2 px-2 py-1 hover:bg-blue-100 border-[2px] border-gray-600 focus:ring-blue-500 focus:border-blue-500 outline-none rounded"
                        placeholder="Enter your mobile no" />
                    <label htmlFor="name" className="text-sm font-semibold">Password</label>
                    <input type="password"
                        value={credential.password}
                        onChange={onchange}
                        name="password" id="password"
                        className="mb-2 px-2 py-1 hover:bg-blue-100 border-[2px] border-gray-600 focus:ring-blue-500 focus:border-blue-500 outline-none rounded"
                        placeholder="Enter your password" />
                    <button className="bg-yellow-400 my-2 rounded py-1 px-2">Sign Up</button>
                </form>
            </div>
            <div className="flex flex-col w-full justify-center items-center  mt-4 mb-2">
                <h4 className="text-sm mb-1">New to ApnaShope?</h4>
                <button onClick={handleSignUp}
                    className="md:w-[24%] w-[80%] sm:text-sm text-[10px] font-semibold px-2 py-1 rounded-2xl  border-[1px] border-gray-600 ">
                    Already have an account? <span className="text-sky-400">Sign In</span>
                </button>
            </div>
        </section>
    )
}

export default SignUp;
