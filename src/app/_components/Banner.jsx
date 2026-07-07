import Image from "next/image";
import leaves from "../../../public/image/leaves.png";
import bannerDish from "../../../public/image/banner_dish.png";

export default function Banner() {
    return (
        <div className="banner bg-[url(../../public/image/banner.png)] bg-cover py-24">
            <div className="container mx-auto">
                {/* <Image
                    src={bannerImage}
                    alt="banner image"
                    className="bg_bannerImage"
                  /> */}
                <div className="relative flex flex-col-reverse md:flex-row md:flex items-center justify-start">
                    <Image
                        src={leaves}
                        alt="leaves photo"
                        className="leavesPhotobanner"
                    />

                    <div className="relative w-full max-w-full md:max-w-lg ">
                        <h1 className="text-5xl font-bold text-gray-800 py-4">Eat Fresh <br /> Eat Healthy</h1>
                        <p className="mt-3 text-md text-gray-700">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library, </p>
                        <div className="mt-5">
                            <button className="cursor-pointer bg-red-800 px-4 py-3 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-yellow-600">View Our Menu</button>
                        </div>
                    </div>
                    <div className="relative w-full flex items-center justify-center">
                        <div className="w-full max-w-[400px] xl:max-w-xl lg:max-w-[450px] md:max-w-[350px]">
                            <Image
                                src={bannerDish}
                                alt="bannerdish"
                                width={576}
                                height={576}
                                objectFit="cover"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}