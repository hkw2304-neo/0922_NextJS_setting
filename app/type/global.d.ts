export {};

declare global {
    interface Window {
        Android?: {
            openToast: (message:string) => void;
            openCamera: () => void;
            openGallery: () => void;
            // 네이티브 기능 추가될 때마다 여기 한 줄만 추가
        };
        onImageCaptured?: (filePath: string) => void;
        // 안드로이드에서 호출할 함수
    }
}