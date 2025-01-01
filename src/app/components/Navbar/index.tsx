"use client"

import React, { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="flex flex-col md:flex-row justify-between text-white bg-gray-400 py-4 px-standardSize"
        >
            <div className="flex justify-between items-center mb-4 md:mb-0">
                <div>Logo</div>
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                <ul
                    className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-10"
                >
                    <li>Home</li>
                    <li>Blog</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div></div>
        </div>
    )
}

export default Navbar
