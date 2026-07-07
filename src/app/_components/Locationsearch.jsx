"use client"
import { useEffect, useState } from "react";
export default function Locationsearch(props) {
    const [locations, setLocations] = useState([])
    const [locationitem, setLocationItem] = useState('');
    const [showlocation, setshowlocation] = useState(false);
    
    useEffect(() => {
        loadLocation()
    }, [])

    const loadLocation = async () => {
        let response = await fetch(`http://localhost:3000/api/frontend/location`, {
            method: "GET",
        })
        response = await response.json();
        setLocations(response.result);
    }
    const changeLocation = (item) => {
        setLocationItem(item);
        setshowlocation(false)
        props.setGetLocation(item)
        localStorage.setItem('location', item);
    }
    return (
        <div className="form-group relative mr-1">
            <input type="text" className="border-1 border-gray-400 p-3 rounded cursor-pointer focus-visible:outline-none" placeholder="Search City.." onClick={() => { setshowlocation(true); }} readOnly={true} value={props.getLocation ? props.getLocation : locationitem} />
            <ul className="absolute left-0 top-full w-full bg-white shadow-lg">
                {
                    showlocation && locations.map((item, index) => {
                        return <li key={index} className="p-4 border-b-1 border-gray-400 cursor-pointer last:border-b-0" onClick={() => { changeLocation(item) }}>{item}</li>
                    })
                }

            </ul>
        </div>
    )
}