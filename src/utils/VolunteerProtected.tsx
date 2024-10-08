
import { redirect } from "next/navigation";

import React from "react";
import { useSelector } from "react-redux";


interface ProtectedProps {
    children?: React.ReactNode;
}

export default function VolunteerProtected({ children }: ProtectedProps) {
    const  user  = useSelector((state: any) => state.user.user);

    if (user) {
        const isUser = user?.role ===  "user";
        return isUser ?   redirect("/") : children;
    } else {
        redirect("/");
    }


}
