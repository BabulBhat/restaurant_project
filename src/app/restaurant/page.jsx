"use client"
import { useState } from "react";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantLogin from "../_components/RestaurantLogin";

export default function Admin() {
    const [loginSignup, setLoginSignup] = useState(false)
    return (
        <div className="flex items-center justify-center h-screen w-full bg-[url(../../public/image/adminLogin.jpg)] bg-no-repeat bg-cover bg-right">
            {
                loginSignup ?
                    <RestaurantSignup setLoginSignup={setLoginSignup} loginSignup={loginSignup} />
                    :
                    <RestaurantLogin setLoginSignup={setLoginSignup} loginSignup={loginSignup} />
            }


        </div>
    )
}