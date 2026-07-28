import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { delFood, editFood } from "../redux/foodSlice";
import Loader from "./Loader";

export default function RestaurantFoodList(props) {
  const { data, loading } = useSelector((state) => state.food);
  const dispatch = useDispatch();
  if (loading === true) return <Loader />;
  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div className="bg-white px-4">
          <h4 className="text-3xl font-bold pb-3">Food List</h4>
          <div className="table-responsive">
            <table className="table-auto w-full">
              <thead>
                <tr className="text-left">
                  <th className="border border-gray-400 px-2">ID</th>
                  <th className="border border-gray-400 px-2">Name</th>
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
                  data.result.map((item, index) => {
                    return (
                      <tr key={index} className="py-2">
                        <td className="border border-gray-400 px-2">
                          {index + 1}
                        </td>
                        <td className="border border-gray-400 px-2">
                          {item.name}
                        </td>
                        <td className="border border-gray-400 px-2">
                          {item.price}
                        </td>
                        <td className="border border-gray-400 px-2">
                          <Image
                            src={item.foodimg}
                            alt="Food Image"
                            width={50}
                            height={50}
                          />
                        </td>
                        <td className="border border-gray-400 px-2">
                          {item.description}
                        </td>
                        <td className="border border-gray-400 px-2">
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
        </div>
      )}
    </>
  );
}
