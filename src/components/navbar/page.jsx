'use client'
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import slack from "../../services/slack"
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter
import { useSession, signIn, signOut, getProviders } from "next-auth/react"
import toast, { Toaster } from 'react-hot-toast';
import { setUser, logout } from "../../redux/userSlice";
import { useGetUserInfoQuery, useLogoutMutation } from "../../redux/userApi"
import { LuLogOut } from "react-icons/lu";

export default function Navbar() {
    const [loginLoading, setLoginLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const dispatch = useDispatch();
    const [performLogout] = useLogoutMutation(); // Rename to avoid conflict with userSlice's logout action
    const { data, error, isLoading, refetch } = useGetUserInfoQuery();
    const [userData, setUserData] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [section, setSection] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navbarItem = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
        { name: 'About Us', path: '/about-us' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact Us', path: '/#contact-us' }
    ];

    const handleLogout = async () => {
        try {
            await performLogout().unwrap();
            setUserData(null);
            toast.success('Logout successful');
            setIsUserLoggedIn(false);
        } catch (error) {
            toast.error('Error logging out');
        }
    };

    useEffect(() => {
        if (data && data.loggedIn) {
            setIsUserLoggedIn(true);
            setUserData(data.user);
            dispatch(setUser(data.user));
        } else {
            setIsUserLoggedIn(false);
            setUserData(null);
        }
    }, [data, dispatch]);

    const [registerUser, setRegisterUser] = useState({
        name: "",
        email: "",
        password: "",
        enrollmentNo: "",
        semester: "" // Set initial value
    });

    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    });

    const onSignup = async () => {
        setRegisterLoading(true);
        if (!registerUser.email || !registerUser.password) {
            toast.error("Please fill out all required fields");
            setRegisterLoading(false);
            return;
        }
        try {
            const response = await axios.post('/api/auth/sign-up', registerUser);
            if (response.status === 200) {
                setOpen(false);
                alert("Verify your email to unlock your account!");
                toast.success('Registration Successful!');
                setIsUserLoggedIn(true);
            }
        } catch (error) {
            toast.error("Error Occurred!");
        } finally {
            setRegisterLoading(false);
        }
    };

    const onLogin = async () => {
        setLoginLoading(true);
        if (!loginUser.email || !loginUser.password) {
            toast.error("Please enter both email and password");
            setLoginLoading(false);
            return;
        }
        try {
            const response = await axios.post('/api/auth/sign-in', loginUser);
            if (response.status === 200) {
                setIsUserLoggedIn(true);
                setOpen(false);
                toast.success("Welcome!");
            }
        } catch (error) {
            toast.error("Error Occurred!");
        } finally {
            setLoginLoading(false);
        }
    };
    return (
        <div className="w-full">
            <div className=" items-center gap-3 sticky top-5  justify-between py-5  px-5  hidden sm:flex  text-black">
                <div className="">
                    <Image
                        src="https://i.ibb.co/ZdsyCMX/Logo-removebg-1.png"
                        alt="Description of image"
                        width={40}
                        height={40}
                    />
                </div>

                <div className=" flex gap-7">

                    {

                        navbarItem.map((item, i) => (
                            <Link href={item.path} key={i}>
                                <p style={{
                                    textDecoration: pathname === item.path ? 'underline' : 'none',

                                }} className="NeueMontreal-Regular text-[#16423C] underline-offset-1 font-normal text-lg hover:underline  cursor-pointer"  >{item.name} </p> </Link>
                        )
                        )
                    }
                    {userData && userData?.role === "admin" &&
                        <Link href="/admin">
                            <p className="NeueMontreal-Regular text-[#004D43] font-normal text-lg hover:underline cursor-pointer"  >Admin </p> </Link>
                    }
                </div>
                {isUserLoggedIn ? (<>
                    <div className="flex gap-6">
                        {/* <button className="text-[#4AFAAB] font-semibold">Login</button> */}
                        <button onClick={handleLogout} className=" border border-[#004D43] text-[#004D43] font-semibold px-7 py-2 rounded-full"><LuLogOut /></button>

                    </div>
                </>) : (<>
                    <div className="flex gap-6">
                        {/* <button className="text-[#4AFAAB] font-semibold">Login</button> */}
                        <button onClick={() => (setOpen(!open))} className="  bg-[#004D43] py-2 text-[#fff] font-semibold   rounded-lg px-5">Join</button>

                    </div>
                </>)}


            </div>
            {/* Mobile */}
            <div className=" items-center gap-3 sticky top-0 justify-between flex px-[1rem] pt-4 py-3  bg-opacity-0  sm:hidden   text-[#004D43] ">
                <div className="">
                    <Image
                        src="https://i.ibb.co/ZdsyCMX/Logo-removebg-1.png"
                        alt="Description of image"  // Alt text for accessibility
                        width={40}                // Image width
                        height={40}               // Image height
                    />
                </div>
                <div className="hidden  gap-7"></div>
                {!isMenuOpen &&
                    <>
                        {isUserLoggedIn ? (<>
                            <div className="flex gap-2 items-center">
                                {/* <button className="text-[#4AFAAB] font-semibold">Join</button> */}
                                <button onClick={handleLogout} className={` bg-[#004D43] py-2 text-[#fff] font-semibold px-3  rounded-lg`}><LuLogOut /></button>
                                <RiMenu2Fill className="text-2xl mr-1" onClick={() => { setIsMenuOpen(!isMenuOpen) }} />

                            </div>
                        </>) : (<>
                            <div className="flex gap-5 items-center">
                                {/* <button className="text-[#4AFAAB] font-semibold">Join</button> */}
                                <button onClick={() => { setOpen(!open) }} className={` bg-[#004D43]  text-[#fff] font-semibold px-3 py-1 rounded-lg`}>Join</button>
                                <RiMenu2Fill className="text-2xl mr-1" onClick={() => { setIsMenuOpen(!isMenuOpen) }} />

                            </div>
                        </>)}</>


                }

            </div>
            {isMenuOpen && <>

                <div className="z-[999]  absolute top-0 items-end flex flex-col right-0 pt-8 w-[17rem]  pr-8 h-screen bg-black bg-opacity-10 backdrop-blur-lg text-[#004D43] ">
                    <RxCross2 className="text-2xl  mb-5" onClick={() => { setIsMenuOpen(!isMenuOpen) }} />

                    {
                        navbarItem.map((item, i) => (
                            <Link href={item.path} key={i}>
                                <p style={{
                                    textDecoration: pathname === item.path ? 'underline' : 'none'

                                }} className=" NeueMontreal-Regular text-[#16423C]  text-end text-2xl my-5  hover:text-[#4AFAAB] cursor-pointer" >{item.name} </p></Link>

                        )
                        )
                    }
                    {userData && userData?.role === "admin" &&
                        <Link href="/admin">
                            <p className=" NeueMontreal-Regular text-[#004D43]  text-end text-2xl my-5  hover:text-[#4AFAAB] cursor-pointer"  >Admin </p> </Link>
                    }
                </div>
            </>}
            {
                open &&
                <div className="z-50  animate_top shadow-slate-700 shadow-4xl absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[90%] m-auto flex justify-center sm:w-[450px] bg-[#004D43]  rounded-[15px] backdrop-blur-[0.5rem] pt-4 pb-5 outline-none   ">
                    <div className="w-[90%]">
                        {
                            section === 0 && <>
                                <p className="text-[25px] text-[#fff]  font-[500] text-center py-2 mb-6">Login</p>
                                <label className={`text-[14px] block  text-sm font-medium leading-6  text-[#fff]  font-sans mt-8 Gilroy-Regular`} htmlFor='email'>
                                    Email:
                                </label>
                                <input value={loginUser.email} type="email" name="email" id="email" placeholder='example@gmail.com' className={`w-full text-black  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })} />
                                <label className={`text-[14px] block text-sm font-medium leading-6  text-[#fff]  font-sans mt-8 Gilroy-Regular`} htmlFor='password'>
                                    Password:
                                </label>
                                <input value={loginUser.password} placeholder="pass@123" type="password" name="password" id="password" className={`w-full text-[#0A1D26]  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })} />
                                <div className="w-full mt-5">

                                    <button onClick={onLogin} type="submit" className={`mt-10  flex w-full justify-center rounded-md bg-[#CDEA68]  px-3 py-1.5 text-sm  leading-6 text-[#0A1D26] shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  cursor-pointer`}>{loginLoading ? "Loading..." : "Login"}</button>
                                </div>
                                <h5 className="text-center pt-4 tet-[14px] text-white">
                                    Not have any account?{""}
                                    <span className='text-[#CDEA68] pl-1 cursor-pointer' onClick={() => setSection(1)} >
                                        Sign up
                                    </span>
                                </h5>
                            </>
                        }

                        {
                            section === 1 && <>
                                <p className="text-[25px] text-[#fff]  font-[500] text-center py-2 mb-6">Register</p>
                                <label className={`text-[14px] block  text-sm font-medium leading-6 text-white  font-sans mt-8 Gilroy-Regular`} htmlFor='name'>
                                    Name:
                                </label>
                                <input type="text" name="name" id="name" placeholder='John bro' className={`w-full text-black  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} value={registerUser.name} onChange={(e) => setRegisterUser({ ...registerUser, name: e.target.value })} />

                                <label className={`text-[14px] block  text-sm font-medium leading-6 text-white  font-sans mt-5 Gilroy-Regular`} htmlFor='email'>
                                    Email:
                                </label>
                                <input value={registerUser.email} type="email" name="email" id="email" placeholder='example@gmail.com' className={`w-full text-black  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })} />
                                <label className={`text-[14px] block text-sm font-medium leading-6 text-white  font-sans mt-5 Gilroy-Regular`} htmlFor='password'>
                                    Password:
                                </label>
                                <input value={registerUser.password} type="password" name="password" id="password" className={`w-full text-[#0A1D26]  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })} />
                                {/*  */}
                                <div className="flex -gap-5">
                                    <div className="">
                                        <label className={`text-[14px] block text-sm font-medium leading-6 text-white   font-sans mt-5 Gilroy-Regular`} htmlFor='enrollmentNo'>
                                            Enrollment No:
                                        </label>
                                        <input onChange={(e) => setRegisterUser({ ...registerUser, enrollmentNo: e.target.value })} value={registerUser.enrollmentNo} type="text" name="enrollmentNo" id="enrollmentNo" placeholder='23C46205' className={`w-1/2 text-[#0A1D26]  bg-white border rounded h-[40px] px-2 outline-none mt-[10px] `} /></div>

                                    <div className="w-1/2 gap-2">
                                        <label className={`text-[14px] block text-sm font-medium leading-6 text-white  font-sans mt-5 Gilroy-Regular`} htmlFor='semester'>
                                            Semester:
                                        </label>
                                        <select onChange={(e) => setRegisterUser({ ...registerUser, semester: e.target.value })} value={registerUser.semester} name="semester" id="semester" className="rounded w-full mt-[10px] h-[40px]">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select> </div></div>
                                <div className="w-full mt-5">

                                    <button onClick={onSignup} type="submit" className={`mt-10  flex w-full justify-center rounded-md bg-[#CDEA68]  px-3 py-1.5 text-sm  leading-6 text-[#0A1D26] shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  cursor-pointer`}>                                {registerLoading ? "Loading..." : "Register"}
                                    </button>
                                </div>
                                <h5 className="text-center pt-4 tet-[14px] text-white">
                                    have any account?{""}
                                    <span className='text-[#CDEA68] pl-1 cursor-pointer' onClick={() => setSection(0)} >
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
