"use client";
import React, { useState } from 'react';
import Past from "../../components/EventPage/Past"
import Upcoming from "../../components/EventPage/Upcoming"
const Page = () => {
    const [section, setSection] = useState('Upcoming');

    return (
        <div className="">
            <div className="flex justify-center mt-5">
                <div className="flex bg-[#4967FF] text-white px-1 py-1 rounded-lg gap-1 shadow-md">
                    <div
                        onClick={() => setSection('Upcoming')}
                        className={`w-24 text-center py-2 rounded-md cursor-pointer ${section === 'Upcoming' ? 'bg-white text-gray-900' : 'bg-transparent'
                            }`}
                    >
                        <p>Upcoming</p>
                    </div>
                    <div
                        onClick={() => setSection('Past')}
                        className={`w-24 text-center py-2 rounded-md cursor-pointer ${section === 'Past' ? 'bg-white text-gray-900' : 'bg-transparent'
                            }`}
                    >
                        <p>Past</p>
                    </div>
                </div>
            </div>

            {
                section === 'Upcoming' ? < Upcoming /> : <Past />
            }
        </div>
    );
};

export default Page;
