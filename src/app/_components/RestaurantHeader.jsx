"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { logout } from "../redux/restaurantAuthSlice";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

export default function RestaurantHeader() {
    const [mode, setMode] = useState(false)
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        const checkToken = localStorage.getItem('token')
        if (!checkToken) {
            router.push('/restaurant')
        }
        checkTime();
    }, [])

    const checkTime = () => {
        const checkToken = JSON.stringify(localStorage.getItem('token'));
        const { exp } = jwtDecode(checkToken);
        const isExpired = (exp * 1000) - Date.now();

        if (isExpired <= 0) {
            handleLogout();
        }
        else {
            const timer = setTimeout(() => {
                handleLogout();
            }, isExpired)
            return () => clearTimeout(timer);
        }
    }
    const handleLogout = () => {
        const data = dispatch(logout({ logout: true }));
        if (data.payload.logout) {
            localStorage.removeItem('token');
            router.push('/restaurant');
        }
    }
    return (
        <div className="adminHeader">
            <ul className="flex items-center justify-end p-5 text-xl text-black">
                <li className="mr-3 cursor-pointer">
                    <i className="fa-brands fa-sistrix"></i>
                </li>
                <li className="mr-3 cursor-pointer">
                    <Link href='/restaurant/profile'><i className="fa-regular fa-user"></i></Link>
                </li>
                <li className="mr-3 cursor-pointer">
                    {
                        mode ?
                            <i className="fa-solid fa-sun" onClick={() => { setMode(!mode) }}></i>
                            :
                            <i className="fa-regular fa-moon" onClick={() => { setMode(!mode) }}></i>
                    }
                </li>
                <li className="mr-3 cursor-pointer">
                    <i className="fa-regular fa-bell"></i>
                </li>
                <li className="mr-3 cursor-pointer">
                    <i className="fa-solid fa-arrow-right-from-bracket" onClick={handleLogout}></i>
                </li>
            </ul>
        </div>
    )
}