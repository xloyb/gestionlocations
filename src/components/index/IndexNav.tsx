"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import ThemeToggle from '../ThemeToggle';

const IndexNav = () => {
    interface settings {
        sitename: string;
        logo: string;
    }

    const [Settings, setSettings] = useState<settings | null>(null);
    useEffect(() => {
        
    }, []);

    return (
        <div>
            <div className=" navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a href='/'>Home</a></li>
                            <li><a href='/c'>Dashboard</a></li>
                        </ul>
                    </div>

                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl">{Settings?.sitename ?? 'Reantia'}</a>
                </div>
                <div className="navbar-end">
                    <ThemeToggle />
                    {/* <span className="loading loading-ring loading-lg"></span> */}
                    <div className="flex items-center gap-2 text-sm">
                        <Image src="/img/login.png" alt="" width={20} height={20} />
                        <Link href="/sign-in">Login/Register</Link>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default IndexNav