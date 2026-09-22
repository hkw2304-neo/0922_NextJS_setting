import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {UserSession} from "@/app/util/session/UserSession";
import CommonHeader from "@/app/ui/component/CommonHeader";


export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="ko">
        <body>
        <UserSession>
            <CommonHeader />
            {children}
        </UserSession>
        </body>
        </html>
    )
}
