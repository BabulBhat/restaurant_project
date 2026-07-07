import Layout from "../_components/Layout";
import Image from "next/image";

import leaves from "../../../public/image/leaves.png"
import bannerDish from "../../../public/image/banner_dish.png"

export default function Home() {
    return (
        <Layout>
            <div className="container mx-auto">
                <div className="about relative block md:flex items-center justify-start py-24  px-4">
                    <Image
                        src={leaves}
                        alt="leaves photo"
                        className="about_leavesimg"
                    />
                    <div className="aboutImage w-full md:max-w-xl">
                        <Image
                            src={bannerDish}
                            alt="About Dish"
                            width={1200}
                            height={1200}
                            objectFit="cover"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="w-full md:max-w-lg">
                        <h2 className="text-4xl font-bold py-4 capitalize text-gray-800">Lorem Ipsum is simply dummy</h2>
                        <p className="text-sm pb-2 text-gray-700">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. </p>
                        <p className="text-sm pb-2 text-gray-700">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard my text for Letraset's Body Type sheets. </p>
                        <div className="flex items-center justify-start mt-5">
                            <button className="cursor-pointer bg-red-800 px-4 py-3 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-yellow-600">About Us</button>
                            <button className="cursor-pointer bg-yellow-600 px-4 py-3 rounded text-white text-sm uppercase font-semibold mr-4 hover:bg-red-800">Read More..</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}