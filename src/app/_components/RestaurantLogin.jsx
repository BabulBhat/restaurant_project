import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RestaurantLoginAuth } from "../redux/restaurantAuthSlice";
import { ToastContainer, toast } from 'react-toastify';
import ToastAlert from "./ToastAlert";

export default function RestaurantLogin(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { message, loading, error } = useSelector((state) => state.registerAuth);
    const [data, setData] = useState({
        email: '',
        password: '',
        login: true
    })
    useEffect(() => {
        const checkToken = localStorage.getItem('token')
        if (checkToken) {
            router.push('/restaurant/dashboard')
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }
    const handleLogin = async () => {
        const { email, password } = data;
        if (email.trim() == "" || password.trim() == "") {
            toast.error("All Field Required", {
                position: "top-right",
                autoClose: 5000,
            });
        }
        else {
            const userdata = await dispatch(RestaurantLoginAuth(data));
            if (!userdata.payload) {
                toast.error('Please Enter Correct Credentials.', {
                    position: "top-right",
                    autoClose: 5000,
                })
            }
            else {
                localStorage.setItem('token', userdata.payload)
                router.push('/restaurant/dashboard')
            }
        }
    }

    return (
        <>
            <div className="login text-white w-full max-w-[350px] p-4 rounded-md shadow-lg border-1 backdrop-blur-lg">
                <h2 className="relative z-10 text-2xl font-semibold">Login</h2>
                <hr className="relative z-10 my-2" />
                <div className="relative z-10 form-group">
                    <label htmlFor="" className="block py-2">Email ID</label>
                    <input type="text" className="w-full px-3 py-2 border-1 border-gray-500 text-white rounded-md focus-visible:outline-none" placeholder="Email ID" name="email" onChange={handleChange} />
                </div>
                <div className="relative z-10 form-group">
                    <label htmlFor="" className="block py-2">Password</label>
                    <input type="text" className="w-full px-3 py-2 border-1 border-gray-500 text-white rounded-md focus-visible:outline-none" placeholder="Password" name="password" onChange={handleChange} />
                </div>
                <div className="relative z-10 form-group mt-4">
                    <button className="bg-red-800 rounded-sm cursor-pointer hover:bg-yellow-600 text-white px-4 py-2" onClick={handleLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                </div>
                <div className="form=group">
                    <button className="my-3 block cursor-pointer" onClick={() => { props.setLoginSignup(!props.loginSignup) }}>
                        <span>Create an Account? Sign Up </span>
                    </button>
                </div>

            </div>
            <ToastAlert />
        </>
    )
}