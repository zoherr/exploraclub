"use client"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
import localFont from "next/font/local";
import "./globals.css";
import toast, { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from "../redux/store"
import Navbar from "../components/navbar/page"
import Footer from "../components/Footer/page"
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

// export const metadata = {
//   title: "Explora Club",
//   description: "ITM sls Baroda University, Explora club, itmbu,itm,itm explora club,club,explora club",
// };

export default function RootLayout({ children }) {

    return (
        <html lang="en">

            <body >
                <Toaster
                    position="top-center" />
                <Provider store={store}>
                    <Navbar />
                    {children}
                    <SpeedInsights />
<Analytics/>
                    {/* <  Footer /> */}
                </Provider>
            </body>
        </html>
    );
}
