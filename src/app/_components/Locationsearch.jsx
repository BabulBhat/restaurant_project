"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLocation } from "../redux/frontend/location/loadlocationSlice";
import { getallCategory } from "../redux/frontend/allcategory/allcategorySlice";
export default function Locationsearch(props) {
  const [locations, setLocations] = useState([]);
  const [locationitem, setLocationItem] = useState("");
  const [showlocation, setshowlocation] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    loadLocation();
    const location = localStorage.getItem("location");
    if (location) {
      dispatch(getallCategory(location));
    }
  }, [dispatch]);
  
  const loadLocation = async () => {
    const loc = await dispatch(getLocation());
    if (loc.type === "loadlocation/fulfilled") {
      setLocations(loc.payload);
    }
  };
  const changeLocation = (item) => {
    setLocationItem(item);
    setshowlocation(false);
    props.setGetLocation(item);
    localStorage.setItem("location", item);  
    dispatch(getallCategory(item));
  };
  
  return (
    <div className="form-group relative mr-1">
      <input
        type="text"
        className="locationSearch border-1 border-gray-400 p-3 rounded cursor-pointer text-black focus-visible:outline-none"
        placeholder="Search City.."
        onClick={() => {
          setshowlocation(true);
        }}
        readOnly={true}
        value={props.getLocation ? props.getLocation : locationitem}
      />
      <ul className="absolute left-0 top-full w-full bg-white shadow-lg overflow-hidden rounded">
        {showlocation &&
          locations.map((item, index) => {
            return (
              <li
                key={index}
                className="p-4 border-b-1 border-gray-400 text-black cursor-pointer last:border-b-0"
                onClick={() => {
                  changeLocation(item);
                }}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
