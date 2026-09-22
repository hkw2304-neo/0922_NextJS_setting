'use client';
import {useSearchParams} from "next/navigation";

export default function DetailScreen() {

    const searchParams = useSearchParams();
    const menuId = searchParams.get('menuId');

    return (
        <div className="container-common">
            <h1>메뉴 상세 화면</h1>
            <p>전달받은 메뉴 ID:{menuId}</p>
        </div>
    )
}