'use client'
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter
import { useSession, signIn, signOut, getProviders } from "next-auth/react"
import toast, { Toaster } from 'react-hot-toast';
import { useGetUserInfoQuery, useLogoutMutation } from "../../redux/userApi"
export default function Navbar() {
    const dispatch = useDispatch();

    const [logout] = useLogoutMutation();
    const { data, error, isLoading, refetch } = useGetUserInfoQuery();
    // console.log(data);

    const [userData, setUserData] = useState(null)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const handleLogout = async () => {
        try {
            await logout().unwrap();

            toast.success('Logout successful');
            setIsUserLoggedIn(false)
            // window.location.reload();
        } catch (error) {
            toast.error('Error logging out');
        }

    };
    useEffect(() => {
        refetch()
    }, [refetch])

    const [registerUser, setRegisterUser] = useState({
        name: "",
        email: "",
        password: "",
        enrollmentNo: "",
        semester: ""
    })
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: "",
    })
    const pathname = usePathname();

    useEffect(() => {

        if (data && data.loggedIn) {
            refetch()
            // dispatch(setUser(data));
            setIsUserLoggedIn(true);

            setUserData(data.user);
        } else {
            refetch()
            setIsUserLoggedIn(false);
            setUserData(null);
        }
    }, [data,refetch]);


    const [open, setOpen] = useState(false)
    const [section, setSection] = useState(0);
    const navbarItem = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
        { name: 'About Us', path: '/about-us' },
        { name: 'Gallary', path: '/gallary' },
        { name: 'Contact Us', path: '/#contact-us' }
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const onSignup = async () => {
        try {
            const response = await axios.post('/api/auth/sign-up', registerUser);

            if (response.status === 200) {
                refetch()
                setOpen(false)
                // storeUserData(registerUser);
                toast.success('Registeration Successfully!');
            }
        } catch (error) {
            toast.error("Error Occured!!")
            console.log(error);
        }

    }
    const onLogin = async () => {
        try {
            const response = await axios.post('/api/auth/sign-in', loginUser);


            if (response.status === 200) {
                refetch()
                // storeUserData(loginUser);
                setOpen(false)
                toast.success(`Welcome!!`);
            }
        } catch (error) {

            toast.error("Error Occured!!")
            console.log(error);
        }

    }
    return (
        <div className="w-full">
            <div className=" items-center gap-3 sticky top-5  justify-between py-5  px-5  hidden sm:flex  text-black">
                <div className="">
                    <Image
                        src="https://i.ibb.co/PW8XbhC/logo.png"
                        alt="Description of image"
                        width={40}
                        height={40}
                    />
                </div>

                <div className=" flex gap-7">{
                    navbarItem.map((item, i) => (
                        <Link href={item.path} key={i}>
                            <p style={{
                                textDecoration: pathname === item.path ? 'underline' : 'none',
                                color: pathname === item.path ? "#4AFAAB" : "none"
                            }} className="NeueMontreal-Regular text-white font-normal text-lg hover:text-[#4AFAAB] cursor-pointer"  >{item.name} </p> </Link>
                    )
                    )
                }</div>
                {isUserLoggedIn ? (<>
                    <div className="flex gap-6">
                        {/* <button className="text-[#4AFAAB] font-semibold">Login</button> */}
                        <button onClick={handleLogout} className=" border border-[#4AFAAB] text-[#4AFAAB] font-semibold px-7 py-2 rounded-full">logout</button>

                    </div>
                </>) : (<>
                    <div className="flex gap-6">
                        {/* <button className="text-[#4AFAAB] font-semibold">Login</button> */}
                        <button onClick={() => (setOpen(!open))} className=" border border-[#4AFAAB] text-[#4AFAAB] font-semibold px-7 py-2 rounded-full">Join</button>

                    </div>
                </>)}


            </div>
            {/* Mobile */}
            <div className=" items-center gap-3 sticky top-0 justify-between flex px-[1rem] pt-4 py-3  bg-opacity-0  sm:hidden   text-white">
                <div className="">
                    <Image
                        src="https://i.ibb.co/PW8XbhC/logo.png"  // Path to your image
                        alt="Description of image"  // Alt text for accessibility
                        width={40}                // Image width
                        height={40}               // Image height
                    />
                </div>
                <div className="hidden  gap-7"></div>
                {!isMenuOpen &&
                    <>
                        {isUserLoggedIn ? (<>
                            <div className="flex gap-5 items-center">
                                {/* <button className="text-[#4AFAAB] font-semibold">Join</button> */}
                                <button onClick={handleLogout} className={` bg-[#4AFAAB]  text-[#0A1D26] font-semibold px-3 py-1 rounded-lg`}>Logout</button>
                                <RiMenu2Fill className="text-2xl mr-1" onClick={() => { setIsMenuOpen(!isMenuOpen) }} />

                            </div>
                        </>) : (<>
                            <div className="flex gap-5 items-center">
                                {/* <button className="text-[#4AFAAB] font-semibold">Join</button> */}
                                <button onClick={() => { setOpen(!open) }} className={` bg-[#4AFAAB]  text-[#0A1D26] font-semibold px-3 py-1 rounded-lg`}>Join</button>
                                <RiMenu2Fill className="text-2xl mr-1" onClick={() => { setIsMenuOpen(!isMenuOpen) }} />

                            </div>
                        </>)}</>


                }

            </div>
            {isMenuOpen && <>

                <div className="z-[999]  absolute top-0 items-end flex flex-col right-0 pt-8 w-[17rem]  pr-8 h-screen bg-black bg-opacity-10 backdrop-blur-lg text-white">
                    <RxCross2 className="text-2xl  mb-5" onClick={() => { setIsMenuOpen(!isMenuOpen) }} />

                    {
                        navbarItem.map((item, i) => (
                            <Link href={item.path} key={i}>
                                <p style={{
                                    textDecoration: pathname === item.path ? 'underline' : 'none'

                                }} className=" NeueMontreal-Regular text-white text-end text-2xl my-5  hover:text-[#4AFAAB] cursor-pointer" >{item.name} </p></Link>

                        )
                        )
                    }
                </div>
            </>}
            {
                open &&
                <div className="z-50  animate_top shadow-xl absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[90%] m-auto flex justify-center sm:w-[450px] bg-white  rounded-[15px] backdrop-blur-[0.5rem] pt-4 pb-5 outline-none   ">
                    <div className="w-[90%]">
                        {
                            section === 0 && <>
                                <p className="text-[25px] text-[#0A1D26]  font-[500] text-center py-2 mb-6">Login</p>
                                <label className={`text-[14px] block  text-sm font-medium leading-6 text-gray-900  font-sans mt-8 Gilroy-Regular`} htmlFor='email'>
                                    Email:
                                </label>
                                <input value={loginUser.email} type="email" name="email" id="email" placeholder='example@gmail.com' className={`w-full text-black  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })} />
                                <label className={`text-[14px] block text-sm font-medium leading-6 text-gray-900  font-sans mt-8 Gilroy-Regular`} htmlFor='password'>
                                    Password:
                                </label>
                                <input value={loginUser.password} type="password" name="password" id="password" className={`w-full text-[#0A1D26]  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })} />
                                <div className="w-full mt-5">

                                    <button onClick={onLogin} type="submit" className={`mt-10  flex w-full justify-center rounded-md bg-[#4AFAAB]  px-3 py-1.5 text-sm  leading-6 text-[#0A1D26] shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  cursor-pointer`}>Login</button>
                                </div>
                                <h5 className="text-center pt-4 tet-[14px] text-black">
                                    Not have any account?{""}
                                    <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setSection(1)} >
                                        Sign up
                                    </span>
                                </h5>
                            </>
                        }

                        {
                            section === 1 && <>
                                <p className="text-[25px] text-[#0A1D26]  font-[500] text-center py-2 mb-6">Register</p>
                                <label className={`text-[14px] block  text-sm font-medium leading-6 text-gray-900  font-sans mt-8 Gilroy-Regular`} htmlFor='name'>
                                    Name:
                                </label>
                                <input type="text" name="name" id="name" placeholder='example@gmail.com' className={`w-full text-black  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} value={registerUser.name} onChange={(e) => setRegisterUser({ ...registerUser, name: e.target.value })} />

                                <label className={`text-[14px] block  text-sm font-medium leading-6 text-gray-900  font-sans mt-5 Gilroy-Regular`} htmlFor='email'>
                                    Email:
                                </label>
                                <input value={registerUser.email} type="email" name="email" id="email" placeholder='example@gmail.com' className={`w-full text-black  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })} />
                                <label className={`text-[14px] block text-sm font-medium leading-6 text-gray-900  font-sans mt-5 Gilroy-Regular`} htmlFor='password'>
                                    Password:
                                </label>
                                <input value={registerUser.password} type="password" name="password" id="password" className={`w-full text-[#0A1D26]  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })} />
                                {/*  */}
                                <div className="flex -gap-5">
                                    <div className="">
                                        <label className={`text-[14px] block text-sm font-medium leading-6 text-gray-900  font-sans mt-5 Gilroy-Regular`} htmlFor='enrollmentNo'>
                                            Enrollment No:
                                        </label>
                                        <input onChange={(e) => setRegisterUser({ ...registerUser, enrollmentNo: e.target.value })} value={registerUser.enrollmentNo} type="text" name="enrollmentNo" id="enrollmentNo" placeholder='23C46205' className={`w-1/2 text-[#0A1D26]  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} /></div>

                                    <div className="w-1/2 gap-2">
                                        <label className={`text-[14px] block text-sm font-medium leading-6 text-gray-900  font-sans mt-5 Gilroy-Regular`} htmlFor='semester'>
                                            Semester:
                                        </label>
                                        <select onChange={(e) => setRegisterUser({ ...registerUser, semester: e.target.value })} value={registerUser.semester} name="semester" id="semester" className="w-full mt-[10px] h-[40px]">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select> </div></div>
                                <div className="w-full mt-5">

                                    <button onClick={onSignup} type="submit" className={`mt-10  flex w-full justify-center rounded-md bg-[#4AFAAB]  px-3 py-1.5 text-sm  leading-6 text-[#0A1D26] shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  cursor-pointer`}>Register</button>
                                </div>
                                <h5 className="text-center pt-4 tet-[14px] text-black">
                                    have any account?{""}
                                    <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setSection(0)} >
                                        Sign in
                                    </span>
                                </h5>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
