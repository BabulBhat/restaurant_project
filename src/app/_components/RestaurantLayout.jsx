import RestaurantFooter from "./RestaurantFooter";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantSidebar from "./RestaurantSidebar";

export default function RestaurantLayout({ children }) {
    return (
        <>
            <RestaurantHeader />
            <RestaurantSidebar />
            <main className="adminMain p-5 ">
                {children}
            </main>
            <RestaurantFooter />
        </>
    )
}