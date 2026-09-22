'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from "react";
import {fetchTableData, getFilePath} from "@/app/util/Api/ApiService";
export default function HomeScreen() {
    // useState : 변수 상태 관리
    const [imageList, setImageList] = useState<ImageModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    // useEffect : 이벤트 예약 명령어
    useEffect(() => {
        const dataFetch = async () => {
            setIsLoading(true);
            const responeData=await fetchTableData<ImageModel>('hkw_images');
            setImageList(responeData);
            setIsLoading(false);
        }
        dataFetch()
    }, []);

    // 이전 슬라이드로 이동
    const handlePrev = () => {
        if (imageList.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
    };

    // 다음 슬라이드로 이동 (캐러셀의 핵심)
    const handleNext = useCallback(() => {
        if (imageList.length === 0) return;
        setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
    }, [imageList.length]);

    // 💡 [추가] 5초마다 자동으로 이미지가 넘어가는 '자동 재생' 기능
    useEffect(() => {
        if (imageList.length <= 1) return; // 이미지가 없거나 1개면 자동 재생 안 함

        const timer = setInterval(() => {
            handleNext();
        }, 5000); // 5000ms = 5초

        return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [imageList.length, handleNext]);

    if (isLoading) {
        return <div className="main-container"><p>이미지를 로딩 중입니다...</p></div>;
    }

    if (imageList.length === 0) {
        return <div className="main-container"><p>등록된 이미지가 없습니다.</p></div>;
    }

    return (
        <div className="main-container">
            <div className="carousel-container">
                {/* 1. 슬라이더 트랙 (가로로 슬라이딩) */}
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {imageList.map((item, index) => (
                        <div key={item.id} className="carousel-slide">
                            <div className="main-image-wrapper">
                                <Image
                                    src={getFilePath(item.file_path, 'images')}
                                    alt={item.title || `스캔 이미지 ${item.id}`}
                                    fill
                                    sizes="(max-width: 768px) 90vw, 20vw"
                                    className="main-image"
                                    priority={index === 0} // 첫 번째 이미지만 LCP 최적화
                                />
                                {item.title && (
                                    <div className="carousel-caption">
                                        <h3>{item.title}</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {imageList.length > 1 && (
                    <>
                        <button type="button" className="carousel-btn prev" onClick={handlePrev} aria-label="이전 이미지">
                            &#10094;
                        </button>
                        <button type="button" className="carousel-btn next" onClick={handleNext} aria-label="다음 이미지">
                            &#10095;
                        </button>
                    </>
                )}

                {imageList.length > 1 && (
                    <div className="carousel-dots">
                        {imageList.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`dot ${currentIndex === index ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`${index + 1}번째 이미지로 이동`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}