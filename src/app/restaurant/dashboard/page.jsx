"use client"
import Loader from "@/app/_components/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import RestaurantLayout from "@/app/_components/RestaurantLayout";



export default function Dashboard() {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    return (
        <RestaurantLayout>
            {
                loading ?
                    <Loader />
                    : ''
            }
            <h1>Dashboard</h1>
        </RestaurantLayout>

    )
}