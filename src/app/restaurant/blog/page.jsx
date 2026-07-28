import RestaurantBlogAdd from "@/app/_components/RestaurantBlogAdd";
import RestaurantLayout from "@/app/_components/RestaurantLayout";

export default function Blog(){
    return(
        <RestaurantLayout>
            <div className="bg-white p-4">
                <h2 className="text-3xl font-bold pb-3">Blog</h2>
                <RestaurantBlogAdd />
            </div>
        </RestaurantLayout>
    )
}