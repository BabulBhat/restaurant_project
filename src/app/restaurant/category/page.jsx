"use client";
import RestaurantCategoryList from "@/app/_components/RestaurantCategoryList";
import RestaurantLayout from "@/app/_components/RestaurantLayout";
import ToastAlert from "@/app/_components/ToastAlert";
import {
  addcategory,
  editCategory,
  getCategory,
  updateCategory,
} from "@/app/redux/categorySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Category() {
  const { page } = useSelector((state) => state.category);
  const [allcategory, setAllCategory] = useState({
    editid: "",
    category: "",
    tokenresto: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAllCategory({
      ...allcategory,
      tokenresto: `babul ${token}`,
    });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllCategory({
      ...allcategory,
      [name]: value,
    });
  };
  const handleSave = async () => {
    if (allcategory.category.trim() === "") {
      toast("Please Fill The Category Name...");
    } else {
      const token = localStorage.getItem("token");
      const userdata = await dispatch(addcategory({ allcategory, page }));
      if (userdata.type === "addcategory/fulfilled") {
        toast("Save Successfully");
        setAllCategory({
          category: "",
          tokenresto: `babul ${token}`,
        });
      } else {
        toast("Failed");
      }
    }
  };

  const handleEdit = async (id) => {
    const editdata = await dispatch(editCategory(id));
    const { payload } = editdata;
    setAllCategory({
      ...allcategory,
      editid: payload._id,
      category: payload.categoryname,
    });
  };

  const handleUpdate = () => {
    dispatch(updateCategory(allcategory));
  };
  return (
    <RestaurantLayout>
      <div className="restaurantFood bg-white p-4">
        <h2 className="text-3xl font-bold pb-3">Category</h2>
        <div className="grid grid-cols-2 gap-x-5">
          <div className="">
            <label htmlFor="">Category</label>
            <input
              type="text"
              className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none"
              placeholder="Category"
              name="category"
              onChange={handleChange}
              value={allcategory.category}
            />
          </div>
          <div className="col-span-2 mt-3">
            <button
              className="cursor-pointer bg-red-800 px-4 py-3 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-yellow-600"
              onClick={allcategory.editid ? handleUpdate : handleSave}
            >
              {allcategory.editid ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <ToastAlert />
      <RestaurantCategoryList handleEdit={handleEdit} />
    </RestaurantLayout>
  );
}
