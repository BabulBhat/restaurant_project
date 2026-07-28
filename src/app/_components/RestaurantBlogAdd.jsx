export default function RestaurantBlogAdd() {
    return (
        <div className="grid grid-cols-2 gap-x-5">
            <div>
                <label htmlFor="">Name</label>
                <input type="text" className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none" placeholder="Name" />
            </div>
            <div>
                <label htmlFor="">Category</label>
                <input type="text" className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none" placeholder="Category" />
            </div>
            <div className="col-span-2">
                <label htmlFor="">Image</label>
                <input type="text" className="p-2 border-1 border-gray-200 w-full rounded-md focus-visible:outline-none" placeholder="Image" />
            </div>
            <div className="mt-3">
                <button className="cursor-pointer bg-red-800 px-4 py-3 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-yellow-600">Save</button>
            </div>
        </div>
    )
}