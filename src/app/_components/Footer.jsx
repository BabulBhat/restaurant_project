"use client"
import Image from "next/image";
import Logo from "../../../public/image/logo.png"
import restaurantimage from "../../../public/image/restaurant.jpg"
import ads2 from "../../../public/image/ads2.png"
import Locationsearch from "./Locationsearch";

export default function Footer() {
    

    return (
        <>
            
            <footer className="footer bg-[url(../../public/image/background_Restaurant.png)] bg-cover pt-24 text-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-4 gap-10">
                        <div>
                            <Image
                                src={Logo}
                                alt="Logo"
                                width={70}
                                height={70}
                                className="mb-4"
                            />
                            <p className="text-sm mb-5 tracking-tight">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima magnam sunt adipisci mollitia dolorem nulla voluptate quasi molestiae, beatae placeat tenetur, sint expedita accusamus ratione doloremque? Veritatis perspiciatis minima cum?</p>
                            <div className="mb-4 text-sm">
                                <span className="block my-1">Email :- test@gmail.com</span>
                                <span className="block my-1">Phone :- +91123456789</span>
                            </div>
                            <div className="flex items-center justify-start">
                                <a href="" className="block bg-yellow-600 mr-2 flex items-center justify-center p-3 rounded-md hover:bg-red-800">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="" className="block bg-yellow-600 mr-2 flex items-center justify-center p-3 rounded-md hover:bg-red-800">
                                    <i className="fa-brands fa-x-twitter"></i>
                                </a>
                                <a href="" className="block bg-yellow-600 mr-2 flex items-center justify-center p-3 rounded-md hover:bg-red-800">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href="" className="block bg-yellow-600 mr-2 flex items-center justify-center p-3 rounded-md hover:bg-red-800">
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                            </div>
                        </div>

                        <div className="footerMenu">
                            <h3 className="relative py-3 mb-4">Top Restaurant</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Image
                                        src={restaurantimage}
                                        alt="Restaurant Image"
                                        width={150}
                                        height={150}
                                    />
                                </div>

                                <div>
                                    <Image
                                        src={restaurantimage}
                                        alt="Restaurant Image"
                                        width={150}
                                        height={150}
                                    />
                                </div>

                                <div>
                                    <Image
                                        src={restaurantimage}
                                        alt="Restaurant Image"
                                        width={150}
                                        height={150}
                                    />
                                </div>

                                <div>
                                    <Image
                                        src={restaurantimage}
                                        alt="Restaurant Image"
                                        width={150}
                                        height={150}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="footerMenu">
                            <h3 className="relative py-3 mb-4">Quick Links</h3>

                            <ul>
                                <li>
                                    <a href="" className="block my-4 text-sm hover:text-yellow-600">About</a>
                                </li>
                                <li>
                                    <a href="" className="block my-4 text-sm hover:text-yellow-600">Terms & Conditions</a>
                                </li>
                                <li>
                                    <a href="" className="block my-4 text-sm hover:text-yellow-600">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="" className="block my-4 text-sm hover:text-yellow-600">Blog</a>
                                </li>
                                <li>
                                    <a href="" className="block my-4 text-sm hover:text-yellow-600">Contact</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footerMenu">
                            <h3 className="relative py-3 mb-4">Address</h3>


                            <div className="flex items-start justify-start">
                                <div className="flex items-center justify-start w-full max-w-[80px] h-[80px] bg-gray-200 rounded overflow-hidden mr-4">
                                    <Image
                                        src={ads2}
                                        alt="Branch Image"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div>
                                    <h6 className="text-md font-semibold uppercase text-yellow-600">Main Branch</h6>
                                    <p className="text-sm">Sec V, Kolkata, 7000091</p>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="flex items-start justify-start">
                                <div className="flex items-center justify-start w-full max-w-[80px] h-[80px] bg-gray-200 rounded overflow-hidden mr-4">
                                    <Image
                                        src={ads2}
                                        alt="Branch Image"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div>
                                    <h6 className="text-md font-semibold uppercase text-yellow-600">Sub Branch</h6>
                                    <p className="text-sm">Park Cirus, Kolkata, 7000091</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <hr className="my-5" />
                <div className="container mx-auto pb-5">
                    <span className="text-center block">Footer@2026</span>
                </div>
            </footer>
        </>


    )
}
