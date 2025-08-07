import Link from "next/link"
import clientPromise from "@/lib/monogdb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const { handle } = await params;
    const client = await clientPromise;
    const db = client.db('linktree');
    const collection = db.collection('links');

    // if the handle is already claimed, you cannot create the linktree
    const item = await collection.findOne({ handle: handle });

    if (!item) {
        return notFound();
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black justify-center items-start py-10 pt-[140px] px-4 sm:px-6 md:px-10">

            {item && (
                <div className="photo flex justify-center flex-col items-center gap-4 w-full max-w-xl">
                    <img src={item.pic} alt="" width={100} className="rounded-full" />
                    <span className="font-bold text-xl text-white font-sans break-words text-center">@{item.handle}</span>
                    <span className="desc max-w-[60vw] sm:max-w-[40vw] md:max-w-[50vw] text-center text-white font-sans font-light px-2 sm:px-4 break-words">
                        {item.desc}
                    </span>

                    <div className="links w-full flex flex-col items-center">
                        {item.links.map((item, index) => {
                            return (
                                <Link key={index} target="_blank" href={item.link} className="w-full max-w-md px-2">
                                    <div className="shadow-lg py-4 px-2 bg-purple-100 w-full flex justify-center rounded-md my-3 hover:scale-105 transition-all duration-300 cursor-pointer font-bold font-roboto text-center text-sm sm:text-base">
                                        {item.linktext}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
