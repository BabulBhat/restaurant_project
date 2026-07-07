"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Locationsearch from "./Locationsearch";


export default function Header() {
    const [getLocation, setGetLocation] = useState(null);
    useEffect(() => {
        const getStorage = localStorage.getItem('location')
        setGetLocation(getStorage)
    }, [getLocation])
    
    const [showMenu, setshowMenu] = useState(false)
    const [checkMobileScreen, setCheckMobileScreen] = useState(false);
    const [stickyHeader, setstickyHeader] = useState(false)
    useEffect(() => {
        screensize();
        window.addEventListener('resize', screensize);
        screenHight()
        window.addEventListener('scroll', screenHight);
    }, [])
    const screensize = () => {
        if (window.innerWidth <= 768) {
            setCheckMobileScreen(window.innerWidth)
        }
        else if (window.innerWidth > 768) {
            setCheckMobileScreen(false)
        }
    }

    const screenHight = () => {
        if (window.scrollY > 70) {
            setstickyHeader(true)
        }
        else {
            setstickyHeader(false)
        }

    }

    return (
        <>
            {/* Model Start */}
            <div className={`locationModel ${getLocation ? 'dnone' : 'flex'}`}>
                <div className="locationModelInner flex items-center justify-start">
                    <Locationsearch getLocation={getLocation} setGetLocation={setGetLocation} />
                </div>
            </div>
            {/* Model End */}
            <div className={`header fixed left-0 top-0 w-full z-10 ${stickyHeader ? 'bg-gray-100 border-b-1 border-red-800' : ''}`}>
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <Image src={`/image/logo.png`} alt="logo" width={70} height={70} />
                        </Link>
                        <ul className={`${checkMobileScreen ? `block items-center justify-between absolute top-full left-0 w-full bg-slate-200 overflow-hidden transform transition ${showMenu ? 'h-auto' : 'h-[0]'}` : ''} mainMenu md:flex md:static md:bg-transparent md:w-auto `}>
                            <li>
                                <a href="" className="px-4 text-2xl text-red-800 md:text-sm">Login</a>
                            </li>
                            <li>
                                <Link href="/restaurant" className="px-4 text-2xl text-red-800 md:text-sm">Add Restaurant</Link>
                            </li>
                            <li>
                                <a href="" className="px-4 text-2xl text-red-800 md:text-sm">Best Food</a>
                            </li>
                        </ul>

                        <div className="flex items-center justify-between">
                            <ul className="flex items-center justify-between searchPoint">
                                <li className="px-2 block text-md cursor-pointer">
                                    <Locationsearch getLocation={getLocation} setGetLocation={setGetLocation}/>
                                </li>
                                <li className="px-2 block text-2xl cursor-pointer">
                                    <i className="fa-regular fa-moon"></i>
                                </li>
                            </ul>
                            <div className="searchPoint block md:hidden" onClick={() => setshowMenu(!showMenu)}><i className="fa-solid fa-bars text-3xl"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}