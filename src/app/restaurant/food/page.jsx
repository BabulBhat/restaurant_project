"use client"
import RestaurantFoodList from "@/app/_components/RestaurantFoodlist";
import RestaurantLayout from "@/app/_components/RestaurantLayout";
import ToastAlert from "@/app/_components/ToastAlert";
import { addFoodApi, getFood } from "@/app/redux/foodSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Food() {
    const dispatch = useDispatch();
    const [food, setFood] = useState({
        name: '',
        price: '',
        foodimg: '',
        description: '',
        tokenresto: ''
    })
    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchToken = `babul ${token}`;
        setFood({
            ...food,
            tokenresto: `babul ${token}`
        })
        dispatch(getFood(fetchToken))
    }, [])
    const validateImageUrl = (url) => {
        const imageRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;
        return imageRegex.test(url);
    };
    const handleChange = (e) => {
        const { name, value } = e.target
        setFood({
            ...food,
            [name]: value
        })
    }
    const handleSaveFood = async () => {
        const token = localStorage.getItem('token');
        const { name, price, foodimg, description } = food;
        if (!name || !price || !foodimg || !description) {
            toast("All Field Required");
        }
        else {
            validateImageUrl(foodimg)
            if (!validateImageUrl(foodimg)) {
                toast('Please enter a valid image URL (must end in .jpg, .jpeg, .png, .webp, or .gif)')
            }
            else {
                const userdata = await dispatch(addFoodApi(food));
                if (userdata.type === "addfood/fulfilled") {
                    toast('Save Successfully');
                    setFood({
                        name: '',
                        price: '',
                        foodimg: '',
                        description: '',
                        tokenresto: `babul ${token}`
                    })
                }
                else {
                    toast("Failed");
                }
            }
        }
    }

    // if (loading === true) return <h1>Loading...</h1>
    return (
        <RestaurantLayout>
            <div className="restaurantFood bg-white p-4">
                <h2 className="text-3xl font-bold pb-3">Food</h2>
                <div className="grid grid-cols-2 gap-x-5">
                    <div className="">
                        <label htmlFor="" className="block py-2">Name</label>
                        <input type="text"
                            name="name"
                            value={food.name}
                            onChange={handleChange}
                            className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none" placeholder="Name" />
                    </div>
                    <div>
                        <label htmlFor="" className="block py-2">Category</label>
                        <input type="text" disabled
                            name=""
                            value=""
                            onChange={handleChange}
                            className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none read-only:bg-gray-400" placeholder="Category" />
                    </div>
                    <div>
                        <label htmlFor="" className="block py-2">Price</label>
                        <input type="number"
                            name="price"
                            value={food.price}
                            onChange={handleChange}
                            className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none" placeholder="Price" />
                    </div>
                    <div>
                        <label htmlFor="" className="block py-2">Image</label>
                        <input type="url"
                            name="foodimg"
                            value={food.foodimg}
                            onChange={handleChange}
                            className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none" placeholder="Image" />
                    </div>
                    <div>
                        <label htmlFor="" className="block py-2">Description</label>
                        <input type="text"
                            name="description"
                            value={food.description}
                            onChange={handleChange}
                            className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none" placeholder="Description" />
                    </div>

                </div>
                <div className="mt-3">
                    <button className="cursor-pointer bg-red-800 px-4 py-3 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-yellow-600" onClick={handleSaveFood}>Add Food</button>
                </div>

            </div>
            <RestaurantFoodList />

            <ToastAlert />
        </RestaurantLayout>
    )
}