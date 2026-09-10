import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { delFood, editFood, setFoodPage } from "../redux/admin/food/foodSlice";
import Loader from "./Loader";

export default function RestaurantFoodList(props) {
  const { data, page, totalpage, loading } = useSelector((state) => state.food);
  const dispatch = useDispatch();
  if (loading === true) return <Loader />;
  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div className="bg-white px-4">
          <h4 className="text-3xl font-bold pb-3">Food List</h4>
          <div className="overflow-x-auto">
            <table className="table-auto min-w-full">
              <thead>
                <tr className="text-left">
                  <th className="border border-gray-400 px-2">ID</th>
                  <th className="border border-gray-400 px-2">Name</th>
                  <th className="border border-gray-400 px-2">Category</th>
                  <th className="border border-gray-400 px-2">Quantity</th>
                  <th className="border border-gray-400 px-2">Price</th>
                  <th className="border border-gray-400 px-2">Image</th>
                  <th className="border border-gray-400 px-2">Description</th>
                  <th className="border border-gray-400 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 || data === undefined ? (
                  <tr>
                    <td>No Records Found.</td>
                  </tr>
                ) : (
                  data.map((item, index) => {
                    // console.log(item);

                    return (
                      <tr key={index} className="py-2">
                        <td className="border border-gray-400 px-2 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="border border-gray-400 px-2 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="border border-gray-400 px-2 whitespace-nowrap">
                          {item.category?.categoryname}
                        </td>
                        <td className="border border-gray-400 px-2 whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="border border-gray-400 px-2 whitespace-nowrap">
                          {item.price}
                        </td>
                        <td className="border border-gray-400 px-2 whitespace-nowrap">
                          <Image
                            src={item.foodimg}
                            alt="Food Image"
                            width={50}
                            height={50}
                          />
                        </td>
                        <td className="border border-gray-400 px-2 whitespace-nowrap">
                          {item.description}
                        </td>
                        <td className="border border-gray-400 px-2 whitespace-nowrap">
                          <button
                            className="cursor-pointer bg-yellow-400 px-4 py-2 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-green-600"
                            onClick={() => props.editFood(item._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="cursor-pointer bg-red-600 px-4 py-2 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-black"
                            onClick={() => dispatch(delFood(item._id))}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="text-right mt-4">
            <button
              className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                dispatch(setFoodPage(page - 1));
              }}
            >
              Prev
            </button>

            {Array.from({ length: totalpage }, (_, index) => {
              return (
                <button  key={index} className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium transition ${page === index + 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`} onClick={() => dispatch(setPage(index + 1))}>
                  {index + 1}
                </button>
              );
            })}

            <button
              className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                dispatch(setFoodPage(page + 1));
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
