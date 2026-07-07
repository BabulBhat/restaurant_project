import { ToastContainer } from "react-toastify";

export default function ToastAlert(){
    return(
        <ToastContainer
                position="top-right"
                autoClose={5000}
            />
    )
}