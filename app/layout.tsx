'use client';
import "./globals.css";
import {ReactNode} from "react";
import {UserSession} from "@/app/util/session/UserSession";
import CommonHeader from "@/app/ui/component/commonHeader";
import CategoryMenu from "@/app/ui/component/categoryMenu";
import {SubCategoryModel} from "@/app/data/model/common/categoryModel";
import {useRouter} from "next/navigation";


export default function RootLayout({children,}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const handleCategorySelect = (categoryId: string, sub: SubCategoryModel) => {
        router.push(`/category/${categoryId}/${sub.id}`);
    };


    return (
        <html lang="ko">
        <body>
        <UserSession>
            <CommonHeader/>
            <CategoryMenu onSelect={handleCategorySelect} />
            {children}
        </UserSession>
        </body>
        </html>
    )
}
