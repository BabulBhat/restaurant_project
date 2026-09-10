"use client";
import Loader from "@/app/_components/Loader";
import RestaurantFoodList from "@/app/_components/RestaurantFoodlist";
import RestaurantLayout from "@/app/_components/RestaurantLayout";
import ToastAlert from "@/app/_components/ToastAlert";
import {
  addFoodApi,
  editFoodServer,
  getFood,
  updateFood,
} from "@/app/redux/admin/food/foodSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Food() {
  const {page} = useSelector((state) => state.food);
  
  const dispatch = useDispatch();
  const [food, setFood] = useState({
    editid: "",
    name: "",
    category: "",
    quantity: "",
    price: "",
    foodimg: "",
    description: "",
    tokenresto: "",
  });
  const [inputCategory, setInputCategory] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchToken = `babul ${token}`;
    setFood({
      ...food,
      tokenresto: `babul ${token}`,
    });
    dispatch(getFood({fetchToken, page}));
  }, []);
  const validateImageUrl = (url) => {
    const imageRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;
    return imageRegex.test(url);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({
      ...food,
      [name]: value,
    });
  };
  const handleSaveFood = async () => {
    const token = localStorage.getItem("token");
    const { name, category, price, quantity, foodimg, description } = food;
    if (!name || !category || !price || !quantity || !foodimg || !description) {
      toast("All Field Required");
    } else {
      validateImageUrl(foodimg);
      if (!validateImageUrl(foodimg)) {
        toast(
          "Please enter a valid image URL (must end in .jpg, .jpeg, .png, .webp, or .gif)",
        );
      } else {
        const userdata = await dispatch(addFoodApi(food));

        if (userdata.type === "addfood/fulfilled") {
          toast("Save Successfully");
          setFood({
            name: "",
            category: "",
            quantity: "",
            price: "",
            foodimg: "",
            description: "",
            tokenresto: `babul ${token}`,
          });
        } else {
          toast("Failed");
        }
      }
    }
  };

  const editFood = async (id) => {
    const editdata = await dispatch(editFoodServer(id));
    const { payload } = editdata;
    setFood({
      ...food,
      editid: payload._id,
      name: payload.name,
      category: payload.category,
      quantity: payload.quantity,
      price: payload.price,
      foodimg: payload.foodimg,
      description: payload.description,
    });
  };

  const handleUpdate = async(food) => {
    const token = localStorage.getItem("token");
    const userdata = await dispatch(updateFood(food));
    console.log(userdata);
    
    if (userdata.type === "updateFood/fulfilled") {
      toast("Update Successfully");
      setFood({
        editid: "",
        name: "",
        category: "",
        quantity: "",
        price: "",
        foodimg: "",
        description: "",
        tokenresto: `babul ${token}`,
      });
    } else {
      toast("Failed");
    }
  };

  const { category_data, loading } = useSelector((state) => state.food);

  const handleCategoryChange = (option) => {
    const { _id, categoryname } = option;
    setFood((prev) => ({
      ...prev,
      category: {
        _id,
        categoryname,
      },
    }));
    setInputCategory(false);
  };

  // console.log(food);

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <RestaurantLayout>
          <div className="restaurantFood bg-white p-4">
            <h2 className="text-3xl font-bold pb-3">Food</h2>
            <div className="grid grid-cols md:grid-cols-2 md:gap-x-5">
              <div className="">
                <label htmlFor="" className="block py-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={food.name}
                  onChange={handleChange}
                  className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none"
                  placeholder="Name"
                />
              </div>
              <div className="relative">
                <label htmlFor="" className="block py-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={food.category.categoryname ?? ""}
                  readOnly={true}
                  onChange={handleChange}
                  onClick={() => {
                    setInputCategory(true);
                  }}
                  className="p-2 border-1 border-gray-200 w-full rounded-md cursor-pointer focus-visible:outline-none read-only:bg-gray-400"
                  placeholder="Category"
                />
                <ul
                  className={`food_category ${inputCategory ? "" : "hidden"}`}
                >
                  {category_data &&
                    category_data.map((item, index) => {
                      return (
                        <li
                          onClick={() => {
                            handleCategoryChange(item);
                          }}
                          key={index}
                        >
                          {item.categoryname}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div>
                <label htmlFor="" className="block py-2">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={food.quantity}
                  onChange={handleChange}
                  className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none"
                  placeholder="Quantity"
                />
              </div>
              <div>
                <label htmlFor="" className="block py-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={food.price}
                  onChange={handleChange}
                  className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none"
                  placeholder="Price"
                />
              </div>
              <div>
                <label htmlFor="" className="block py-2">
                  Image
                </label>
                <input
                  type="url"
                  name="foodimg"
                  value={food.foodimg}
                  onChange={handleChange}
                  className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none"
                  placeholder="Image"
                />
              </div>
              <div>
                <label htmlFor="" className="block py-2">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={food.description}
                  onChange={handleChange}
                  className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none"
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="mt-3">
              <button
                className="cursor-pointer bg-red-800 px-4 py-3 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-yellow-600"
                onClick={
                  food.editid ? () => handleUpdate(food) : handleSaveFood
                }
              >
                {food.editid ? "Update" : "Add Food"}
              </button>
            </div>
          </div>
          <RestaurantFoodList editFood={editFood} />
          <ToastAlert />
        </RestaurantLayout>
      )}
    </>
  );
}
