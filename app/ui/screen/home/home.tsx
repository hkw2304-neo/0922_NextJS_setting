'use client';

import { useEffect, useState, useCallback } from "react";
import { fetchTableData, getFilePath } from "@/app/util/Api/ApiService";
import { useRouter } from "next/navigation";
import HomeImageSection from "@/app/ui/screen/home/homeView";
import { CommonButton } from "@/app/ui/component/commonComponent";
import Link from "next/link";
import { useUser } from "@/app/util/session/UserSession";

export default function HomeScreen() {
    const router = useRouter();
    const { isMobileApp } = useUser();

    const [homeView, setHomeView] = useState<HomeImageSectionModel>({ imageList: [] });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const dataFetch = async () => {
            setIsLoading(true);
            try {
                const responeData = await fetchTableData<ImageModel>('hkw_images');
                setHomeView({ imageList: responeData });
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        dataFetch();
    }, []);

    // 네이티브(Kotlin)에서 촬영 결과를 전달받는 콜백 등록
    useEffect(() => {
        console.log("HomeScreen mounted, onImageCaptured 등록 시도");
        window.onImageCaptured = (base64: string) => {
            console.log("base64 길이:", base64.length);
        };

        return () => {
            window.onImageCaptured = undefined;
        };
    }, []);

    const handleCapture = () => {
        if (isMobileApp) {
            window.Android?.openCamera();
        } else {
            alert("이 기능은 앱에서만 사용할 수 있어요.");
        }
    };

    const handlePickImage = () => {
        console.log('촬영하기 클릭');
    };

    if (isLoading) {
        return <div className="main-container"><p>이미지를 로딩 중입니다...</p></div>;
    }

    return (
        <div className="main-container">
            <HomeImageSection imageList={homeView?.imageList} />
            <div className="action-row">
                <CommonButton type="button" title="촬영" className="capture-btn" onClick={handleCapture} isImage="촬영" />
                <CommonButton type="button" title="앨범" className="capture-btn secondary" onClick={handlePickImage} isImage="앨범" />
            </div>
            <Link href="/category/my-space/wishlist" className="wishlist-shortcut">
                <span aria-hidden="true">♡</span>
                <span>찜한 가구</span>
                {count > 0 && <span className="badge">{count > 99 ? '99+' : count}</span>}
            </Link>
        </div>
    );
}