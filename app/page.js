"use client"

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {

  const router = useRouter();
  const [text, settext] = useState("")

  const createTree = () => {
    router.push('/generate?handle=' + text)
  }

  const viewTree = () => {
    router.push('/' + text)
  }

  return (
    <main>

      {/* FIRST SECTION */}
      <section className="bg-[#254f1a] min-h-[130vh] grid grid-cols-1 lg:grid-cols-2 px-4 lg:px-0 pt-[100px]">
        <div className="flex flex-col justify-center lg:ml-[5vw] gap-4 p-4">
          <p className="text-yellow-300 font-extrabold text-4xl md:text-5xl lg:text-7xl leading-tight">Everything you are. In one, simple link in bio.</p>
          <p className="text-white font-bold text-base md:text-lg lg:text-xl">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <input
              value={text}
              onChange={(e) => settext(e.target.value)}
              className="pl-3 pr-6 bg-white py-3 rounded-lg w-full sm:w-auto"
              type="text"
              placeholder="Enter your Handle"
            />
            <button
              onClick={() => createTree()}
              className="rounded-full py-3 px-6 bg-pink-200 font-semibold cursor-pointer w-full sm:w-auto"
            >
              Claim your Linktree
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8 lg:mt-0 lg:mr-[10vw]">
          <img src="/phone.png" alt="homepage image" className="w-[80%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" />
        </div>
      </section>

      {/* SECOND SECTION */}
      <section className="bg-[#e9c0e9] min-h-[100vh] grid grid-cols-1 lg:grid-cols-2 px-4 lg:px-0">
        <div className="flex justify-center items-center py-10 lg:py-0">
          <img src="/phone2.png" alt="homepage image" className="w-70%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" />
        </div>

        <div className="flex flex-col justify-center px-4 py-6 lg:py-0">
          <p className="text-[#502274] font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight">Everything you are. In one, simple link in bio.</p>
          <p className="font-bold text-sm md:text-base lg:text-[17px] pt-4">Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>
          <div>
            <Link href={"/generate"}><button className="rounded-full py-3 px-6 mt-8 bg-[#502274] text-white font-semibold cursor-pointer w-full sm:w-auto">Get Started for free</button></Link>
          </div>
        </div>
      </section>


      {/* THIRD SECTION */}

    <section className="bg-[#780016] min-h-[100vh] grid grid-cols-1 lg:grid-cols-2 px-4 lg:px-0">
        <div className="flex flex-col justify-center lg:ml-[5vw] gap-4 p-4">
          <p className="text-yellow-300 font-extrabold text-4xl md:text-5xl lg:text-7xl leading-tight">Check your personalized Linktree.</p>
          <p className="text-white font-bold text-base md:text-lg lg:text-xl"> Already have a Linktree? Just enter your unique handle to instantly view or edit your personalized bio link page. No login needed – it's quick and easy!</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <input
              value={text}
              onChange={(e) => settext(e.target.value)}
              className="pl-3 pr-6 bg-white py-3 rounded-lg w-full sm:w-auto"
              type="text"
              placeholder="Enter your Name"
            />
            <button
              onClick={() => viewTree()}
              className="rounded-full py-3 px-6 bg-pink-200 font-semibold cursor-pointer w-full sm:w-auto"
            >
              View your Linktree
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8 lg:mt-0 lg:mr-[10vw]">
          <img src="/phone3.png" alt="homepage image" className="w-[80%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" />
        </div>
      </section>
      

    </main>
  );
}
