"use client"

import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const Generate = () => {

    const searchParams = useSearchParams();
    const [links, setlinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get('handle'))
    const [pic, setpic] = useState("")
    const [desc, setdesc] = useState("")

    const handleChange = (index, link, linktext) => {
        setlinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                } else {
                    return item
                }
            })
        })
    }

    const addLink = () => {
        setlinks(links.concat([{ link: "", linktext: "" }]))
    }

    const submitLinks = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "desc": desc
        });

        console.log(raw)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("http://localhost:3000/api/add", requestOptions)
        const result = await r.json();
        if (result.success) {
            toast.success(result.message)
            setlinks([])
            setpic("")
            sethandle("")
            setdesc("")
        }
        else {
            toast.error(result.message)
        }
    }

    return (
        <Suspense>
            <div className='bg-[#E9C0E9] min-h-[80vh] grid grid-cols-1 lg:grid-cols-2 pt-[120px] px-4 gap-8'>

                {/* Column 1 is for displaying the form and column 2 is for displaying the banner. */}
                <div className="col1 flex justify-center items-center flex-col w-full lg:w-[130%]">
                    <h1 className='font-bold text-3xl sm:text-4xl text-center'>Create your Linktree</h1>
                    <div className='flex flex-col gap-3 my-8 w-full max-w-xl'>

                        <h2 className='font-semibold text-lg sm:text-xl'>Step 1: Claim your handle</h2>
                        <div className='mx-0 sm:mx-4'>
                            <input
                                value={handle || ""}
                                onChange={e => { sethandle(e.target.value) }}
                                className='bg-white px-4 py-2 rounded-3xl focus:outline-pink-500 w-full'
                                type="text"
                                placeholder='Choose a Handle'
                            />
                        </div>

                        <h2 className='font-semibold text-lg sm:text-xl'>Step 2: Add Links</h2>
                        {links && links.map((item, index) => {
                            return (
                                <div key={index} className='mx-0 sm:mx-4 flex flex-col sm:flex-row gap-2'>
                                    <input
                                        value={item.linktext || ""}
                                        onChange={e => { handleChange(index, item.link, e.target.value) }}
                                        className='bg-white px-4 py-2 rounded-3xl focus:outline-pink-500 w-full'
                                        type="text"
                                        placeholder='Enter link text'
                                    />
                                    <input
                                        value={item.link || ""}
                                        onChange={e => { handleChange(index, e.target.value, item.linktext) }}
                                        className='bg-white px-4 py-2 rounded-3xl focus:outline-pink-500 w-full'
                                        type="text"
                                        placeholder='Enter link'
                                    />
                                </div>
                            )
                        })}
                        <button onClick={() => addLink()} className='bg-pink-700 text-white px-4 py-2 rounded-full cursor-pointer w-fit'>+ Add Link</button>

                        <h2 className='font-semibold text-lg sm:text-xl'>Step 3: Add Picture and Description</h2>
                        <div className='mx-0 sm:mx-4 flex flex-col gap-2'>
                            <input
                                value={pic || ""}
                                onChange={e => { setpic(e.target.value) }}
                                className='bg-white px-4 py-2 rounded-3xl focus:outline-pink-500 w-full'
                                type="text"
                                placeholder='Enter link to your picture'
                            />
                            <input
                                value={desc || ""}
                                onChange={e => { setdesc(e.target.value) }}
                                className='bg-white px-4 py-2 rounded-3xl focus:outline-pink-500 w-full'
                                type="text"
                                placeholder='Enter Description'
                            />
                            <button
                                disabled={pic == "" || handle == "" || links[0].linktext == "" || links[0].link == ""}
                                onClick={() => { submitLinks() }}
                                className='disabled:bg-slate-600 bg-pink-700 text-white px-4 py-2 rounded-full cursor-pointer w-fit my-4'
                            >
                                Create your LinkTree
                            </button>
                        </div>
                    </div>
                </div>

                {/* Column 2 - Image */}
                <div className="col2 w-full h-full flex justify-center items-center">
                    <img className='w-full max-h-[600px] object-contain' src="/generate.png" alt="" />
                    <ToastContainer />
                </div>
            </div>

        </Suspense>
    )
}

export default Generate
