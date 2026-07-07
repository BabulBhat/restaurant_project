import Image from "next/image";
import LoaderGif from "../../../public/image/Loader.gif";
export default function Loader() {
    return (
        <div className="loader">
            <Image
                src={LoaderGif}
                alt="Loader"
                width={100}
            />
        </div>
    )
}
