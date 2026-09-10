import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RestaurantRegisterAuth } from "../redux/admin/auth/restaurantAuthSlice";
import { toast } from "react-toastify";
import ToastAlert from "./ToastAlert";

export default function RestaurantSignup(props) {
    const [signUp, setsignUp] = useState({
        restaurantName: '',
        restaurantemail: '',
        imgPath: '',
        phone: '',
        city: '',
        password: ''
    })
    const router = useRouter();
    const dispatch = useDispatch();
    const { message, loading, error } = useSelector((state) => state.registerAuth);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setsignUp({
            ...signUp,
            [name]: value
        })
    }

    const handleSignup = async () => {
        const { restaurantName, restaurantemail, imgPath, phone, city, password } = signUp;
        if (restaurantemail.trim() == "" || password.trim() == "") {
            toast.error('All Field Required')
        }
        else {
            const userdata = await dispatch(RestaurantRegisterAuth(signUp))
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
            <ToastAlert />
            <div className="signup text-white w-full max-w-[600px] p-4 rounded-md shadow-lg border-1 backdrop-blur-lg">
                <h2 className="relative z-10 text-2xl font-semibold">Signup</h2>
                <hr className="relative z-10 my-2" />
                <div className="grid grid-cols-2 gap-x-10">
                    <div className="relative z-10 form-group">
                        <label htmlFor="" className="block py-2">Restaurant Name</label>
                        <input type="text" className="w-full px-3 py-2 border-1 border-gray-500 text-white rounded-md focus-visible:outline-none" placeholder="Restaurant Name" name="restaurantName" onChange={handleChange} />
                    </div>
                    <div className="relative z-10 form-group">
                        <label htmlFor="" className="block py-2">Email ID <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full px-3 py-2 border-1 border-gray-500 text-white rounded-md focus-visible:outline-none" placeholder="Email ID" name="restaurantemail" onChange={handleChange} />
                    </div>
                    <div className="relative z-10 form-group">
                        <label htmlFor="" className="block py-2">Image Path</label>
                        <input type="text" className="w-full px-3 py-2 border-1 border-gray-500 text-white rounded-md focus-visible:outline-none" placeholder="Image Path" name="imgPath" onChange={handleChange} />
                    </div>
                    <div className="relative z-10 form-group">
                        <label htmlFor="" className="block py-2">Phone</label>
                        <input type="text" className="w-full px-3 py-2 border-1 border-gray-500 text-white rounded-md focus-visible:outline-none" placeholder="Phone" name="phone" onChange={handleChange} />
                    </div>
                    <div className="relative z-10 form-group">
                        <label htmlFor="" className="block py-2">City</label>
                        <input type="text" className="w-full px-3 py-2 border-1 border-gray-500 text-white rounded-md focus-visible:outline-none" placeholder="City" name="city" onChange={handleChange} />
                    </div>
                    <div className="relative z-10 form-group">
                        <label htmlFor="" className="block py-2">Password <span className="text-red-500">*</span></label>
                        <input type="password" className="w-full px-3 py-2 border-1 border-gray-500 text-white rounded-md focus-visible:outline-none" placeholder="Password" name="password" onChange={handleChange} />
                    </div>
                </div>


                <div className="relative z-10 form-group mt-4">
                    <button className="bg-red-800 rounded-sm cursor-pointer hover:bg-yellow-600 text-white px-4 py-2" onClick={handleSignup}>Signup</button>
                </div>
                <div className="form=group">
                    <button className="my-3 block cursor-pointer" onClick={() => { props.setLoginSignup(!props.loginSignup) }}>
                        <span>Already Account? Login </span>
                    </button>
                </div>

            </div>
        </>

    )
}