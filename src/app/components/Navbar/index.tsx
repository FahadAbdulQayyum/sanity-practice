import React from 'react'

const Navbar = () => {
    return (
        <div
            className="flex justify-between text-white bg-gray-400 py-4 px-standardSize"
        >
            <div>Logo</div>
            <div>
                <ul
                    className="flex justify-between space-x-10"
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
