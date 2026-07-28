import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useEffect } from "react";
import {
  delCategory,
  getCategory,
  setPage,
} from "../redux/categorySlice";
import { toast } from "react-toastify";

export default function RestaurantCategoryList(props) {
  const { data, page, totalpage, loading, totalrecords } = useSelector(
    (state) => state.category,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const authtoken = `babul ${token}`;
    dispatch(getCategory({ authtoken, page }));
  }, [page, dispatch]);
  const formateDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const handleDel = async (id) => {
    const token = localStorage.getItem("token");
    const authtoken = `babul ${token}`;
    const dal = await dispatch(delCategory({ authtoken, id, page }));
    if (dal === "delCategory/fulfilled") {
      toast("Delete Successfully");
    }
  };

  
  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div className="bg-white p-4">
          <h2 className="text-3xl font-bold pb-3">Category List</h2>
          <div>
            <span>
              Page {page} of {totalpage}
            </span>
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-2">Sl.No</th>
                  <th className="border border-gray-400 px-2">Date & Time</th>
                  <th className="border border-gray-400 px-2">Category Name</th>
                  <th className="border border-gray-400 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.paginationresult?.map((item, index) => {
                  return (
                    <tr key={index} className="py-2">
                      <td className="border border-gray-400 px-2">
                        {totalrecords - ((page - 1) * 5 + index)}
                      </td>
                      <td className="border border-gray-400 px-2">
                        {formateDate(item.categorydate)}
                      </td>
                      <td className="border border-gray-400 px-2">
                        {item.categoryname}
                      </td>
                      <td className="border border-gray-400 px-2">
                        <button
                          className="cursor-pointer bg-yellow-400 px-4 py-2 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-green-600"
                          onClick={() => {
                            props.handleEdit(item._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="cursor-pointer bg-red-600 px-4 py-2 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-black"
                          onClick={() => {
                            handleDel(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="text-right mt-4">
              <button
                className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={page === 1}
                onClick={() => dispatch(setPage(page - 1))}
              >
                Prev
              </button>

              {Array.from({ length: totalpage }, (_, index) => {
                return (
                  <button
                    key={index}
                    className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium transition ${page === index + 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                    onClick={() => dispatch(setPage(index + 1))}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <button
                className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={page === totalpage}
                onClick={() => dispatch(setPage(page + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
