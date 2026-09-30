import {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import {getFilePath} from "@/app/util/Api/ApiService";

export default function HomeImageSection(
     homeImageSectionModel : HomeImageSectionModel
){
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handlePrev = () => {
        if (homeImageSectionModel.imageList.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? homeImageSectionModel.imageList.length - 1 : prev - 1));
    };

    const handleNext = useCallback(() => {
        if (homeImageSectionModel.imageList.length === 0) return;
        setCurrentIndex((prev) => (prev === homeImageSectionModel.imageList.length - 1 ? 0 : prev + 1));
    }, [homeImageSectionModel.imageList.length]);

    useEffect(() => {
        if (homeImageSectionModel.imageList.length <= 1) return;

        const timer = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(timer);
    }, [homeImageSectionModel.imageList.length, handleNext]);

    if (homeImageSectionModel.imageList.length === 0) return null;

    return (
        <div className="carousel-container">
            {/* 1. 슬라이더 트랙 */}
            <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {homeImageSectionModel.imageList.map((item, index) => (
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
            {/* 2. 좌/우 이동 버튼 */}
            {homeImageSectionModel.imageList.length > 1 && (
                <>
                    <button type="button" className="carousel-btn prev" onClick={handlePrev} aria-label="이전 이미지">
                        &#10094;
                    </button>
                    <button type="button" className="carousel-btn next" onClick={handleNext} aria-label="다음 이미지">
                        &#10095;
                    </button>
                </>
            )}
            {/* 3. 도트 인디케이터 */}
            {homeImageSectionModel.imageList.length > 1 && (
                <div className="carousel-dots">
                    {homeImageSectionModel.imageList.map((_, index) => (
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
    );
}