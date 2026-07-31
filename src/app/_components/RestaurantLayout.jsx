"use client"
import { useState } from "react";
import RestaurantFooter from "./RestaurantFooter";
import RestaurantHeader from "./RestaurantHeader";

export default function RestaurantLayout({ children }) {
  const [menu, setMenu] = useState(true);
  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <>
      <RestaurantHeader handleMenu={handleMenu} menu={menu} setMenu={setMenu} />
      <main className={`adminMain p-5 ${menu ? "fullbody" : "halfbody"}`}>
        {children}
      </main>
      <RestaurantFooter />
    </>
  );
}
