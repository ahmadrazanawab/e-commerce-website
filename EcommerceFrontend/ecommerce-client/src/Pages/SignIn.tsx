import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Redux/UserAuth";
import axios from "axios";
import { useDispatch } from "react-redux";


const SignIn: React.FC = () => {
    const [credential, setCredential] = useState({
        email: '',
        password: ''
    });
    const host = "http://localhost:7002";
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const handleSignInSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const singInformData = {
                email: credential.email,
                password: credential.password
            }
            const response = await axios.post(`${host}/api/auth/user/v1/userLogin`, singInformData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log(response.data);
            dispatch(signIn(response.data));
            if (response.data.success === true) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                alert('Logged in Successfully');
                navigate('/');
            }
        } catch (error) {
            alert("Credential Invalid Please try again!");
            console.log("Sign In error...", error);
        }

    }
    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    const handleSignIn = () => {
        navigate('/signup');
    }
    return (
        <section className="pt-10 pb-5 bg-slate-100 flex flex-col justify-center items-center">
            <h2 className="text-2xl my-2 font-semibold">Apna Shope</h2>
            <div className="sm:px-4 p-2 sm:py-4 mx-2 shadow-sm border-[2px] border-blue-300 rounded bg-white">
                <h1 className="px-2 text-xl font-semibold">Sign in</h1>
                <form action="" onSubmit={handleSignInSubmit}
                    className="flex flex-col w-[300px]   px-2 py-2">
                    <label htmlFor="name" className="">Email</label>
                    <input type="email"
                        value={credential.email}
                        onChange={onchange}
                        name="email" id="email"
                        className="mb-2 px-2 py-1 hover:bg-blue-100 border-[2px] border-gray-600 focus:ring-blue-500 focus:border-blue-500 outline-none rounded"
                        placeholder="Enter your email" />
                    <label htmlFor="name" className="">Password</label>
                    <input type="password"
                        value={credential.password}
                        onChange={onchange}
                        name="password" id="password"
                        className="mb-2 px-2 py-1 hover:bg-blue-100 border-[2px] border-gray-600 focus:ring-blue-500 focus:border-blue-500 outline-none rounded"
                        placeholder="Enter your password" />
                    <button className="bg-yellow-400 my-2 rounded py-1 px-2">Login</button>
                </form>
            </div>
            <div className="flex flex-col  w-full justify-center items-center  mt-4 mb-2">
                <h4 className="text-sm mb-1">New to ApnaShope?</h4>
                <button onClick={handleSignIn}
                    className="md:w-[24%] w-[80%]  md:text-sm text-[10px] font-semibold px-2 py-1 rounded-2xl   border-[1px] border-gray-600 ">Create your Apna Shope account? <span className="text-sky-400">Sign Up</span></button>
            </div>
        </section>
    )
};

export default SignIn;