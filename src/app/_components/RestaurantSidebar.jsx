"use client"
import Image from "next/image";
import Logo from "../../../public/image/logo.png"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RestaurantSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: '/restaurant/dashboard' },
        { name: "Category", href: '/restaurant/category' },
        { name: "Food", href: '/restaurant/food' },
        { name: "Order", href: '/restaurant/order' },
        { name: "Customer", href: '/restaurant/customer' },
        { name: "Blog", href: '/restaurant/blog' },
    ]

    return (
        <div className="adminSidebar">
            <div className="flex items-center justify-start bg-white px-4">
                <Image
                    src={Logo}
                    alt="Logo"
                    width={80}
                />
            </div>
            <hr className="text-gray-300 " />
            <div className="px-4">
                <ul className="py-3">
                    {
                        menuItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={index}>
                                    <Link href={item.href} className={`p-3 block text-md font-semibold ${isActive? 'text-red-800' : ''}`}>{item.name}</Link>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    )
}