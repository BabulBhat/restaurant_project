"use client"
import RestaurantLayout from "@/app/_components/RestaurantLayout";
import Image from "next/image";
import Profilepage from "../../../../public/image/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RestaurantProfile, RestaurantprofileUpdate } from "@/app/redux/restaurantAuthSlice";
import Loader from "@/app/_components/Loader";
import { toast } from "react-toastify";
import ToastAlert from "@/app/_components/ToastAlert";

export default function Profile() {
    const { data, loading, error } = useSelector((state) => state.registerAuth)
    const dispatch = useDispatch();
    const [updateResto, setupdateResto] = useState({
        id: '',
        restaurantName: '',
        restaurantemail: '',
        imgPath: '',
        phone: '',
        city: '',
        password: ''
    });

    useEffect(() => {
        const gettoken = localStorage.getItem('token');
        if (gettoken) {
            dispatch(RestaurantProfile(gettoken))
        }
        else {
            console.log('Token Not Found!');
        }
    }, [dispatch])

    useEffect(() => {
        data.map((item) => {
            setupdateResto({
                id: item._id,
                restaurantName: item.restaurantName,
                restaurantemail: item.restaurantemail,
                imgPath: item.imgPath,
                phone: item.phone,
                city: item.city,
                password: item.password
            })
        })
    }, [data])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setupdateResto({
            ...updateResto,
            [name]: value
        })

    }

    // Update Form Data
    const handleUpdate = async() => {
        const { restaurantName, restaurantemail, imgPath, phone, city, password } = updateResto;
        if (!restaurantName || !restaurantemail || !imgPath || !phone || !city || !password) {
            toast('All Field Required');
        }
        else {
            const data = await dispatch(RestaurantprofileUpdate(updateResto))
            if(data.type === "restaurantprofileUpdate/fulfilled"){
                toast('Update Successfully');
            }
            
        }
    }

    // 1. Intercept keystrokes to block active typing
    const handleKeyDown = (e) => {
        // Allow Ctrl+V (Windows/Linux) or Cmd+V (Mac)
        const isPasteCommand = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v";

        // Allow navigational/utility keys (BackSpace, Delete, Tab, Arrow keys, Select All)
        const isUtilityKey = [
            "backspace", "delete", "tab", "arrowleft", "arrowright", "arrowup", "arrowdown"
        ].includes(e.key.toLowerCase());

        const isSelectAll = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a";

        // If it's not a paste, utility action, or select all, block the keypress completely
        if (!isPasteCommand && !isUtilityKey && !isSelectAll) {
            e.preventDefault();
        }
    };


    return (
        loading ? <Loader /> :
            <RestaurantLayout>
                <ToastAlert />
                <div className="bg-white p-4">
                    <h2 className="text-3xl font-bold pb-3">My Profile</h2>

                    <div className="w-full max-w-lg p-4 rounded">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center w-[300px] h-[300px] rounded-[100%] bg-gray-400 overflow-hidden relative drop-shadow-xl drop-shadow-black-50 ">
                                <Image
                                    src={updateResto.imgPath ? updateResto.imgPath : Profilepage}
                                    alt="Profile Image"
                                    fill
                                    sizes="100vw"
                                    className="object-cover w-full h-auto"
                                    priority
                                />
                            </div>
                        </div>
                        <h4 className="text-center text-2xl font-bold text-gray-600 uppercase py-3">{updateResto.restaurantName}</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="">
                                <label htmlFor="" className="py-2 block">Email <span className="text-red-600 font-semibold">*</span></label>
                                <input type="text"
                                    className="border-1 border-gray-400 p-3 rounded w-full read-only:bg-gray-300"
                                    name="restaurantemail"
                                    disabled={true}
                                    readOnly={true}
                                    value={updateResto.restaurantemail}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="py-2 block">Phone <span className="text-red-600 font-semibold">*</span></label>
                                <input type="text" className="border-1 border-gray-400 p-3 rounded w-full" name="phone" onChange={handleChange} value={updateResto.phone} />
                            </div>
                            <div>
                                <label htmlFor="" className="py-2 block">City <span className="text-red-600 font-semibold">*</span></label>
                                <input type="text" className="border-1 border-gray-400 p-3 rounded w-full" name="city" onChange={handleChange} value={updateResto.city} />
                            </div>
                            <div>
                                <label htmlFor="" className="py-2 block">Image Path <span className="text-red-600 font-semibold">*</span></label>
                                <input type="text"
                                    className="border-1 border-gray-400 p-3 rounded w-full"
                                    name="imgPath"
                                    value={updateResto.imgPath}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="" className="py-2 block">Password <span className="text-red-600 font-semibold">*</span></label>
                                <input type="text" className="border-1 border-gray-400 p-3 rounded w-full" name="password" onChange={handleChange} value={updateResto.password} />
                            </div>
                            <button className="mt-4 cursor-pointer bg-red-800 px-4 py-3 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-yellow-600" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>

                </div>
            </RestaurantLayout>
    )
}