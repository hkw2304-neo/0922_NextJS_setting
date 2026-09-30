'use client';

// 전역 유지할 데이터
import { createContext, ReactNode, useContext, useState, useSyncExternalStore } from "react";

interface UserContextType {
    sessionUserId: string;
    setSessionUserId: (id: string) => void;
    isMobileApp: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

// UA는 바뀌지 않으니 구독/해제할 것이 없음
function subscribe() {
    return () => {};
}

function getSnapshot() {
    // 에이전트 구분이 우선 중요
    return navigator.userAgent.includes("RoomfitApp");
}

function getServerSnapshot() {
    return false; // 서버에는 UA가 없으니 기본값
}

// 앱 전체를 감싸줄 Provider 컴포넌트
export function UserSession({ children }: { children: ReactNode }) {
    const [sessionUserId, setSessionUserId] = useState('');
    const isMobileApp = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    return (
        <UserContext.Provider value={{ sessionUserId, setSessionUserId, isMobileApp }}>
            {children}
        </UserContext.Provider>
    );
}

// 다른 화면에서 사용
export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser는 <UserSession> 컴포넌트 내부에서만 사용할 수 있습니다.");
    }
    return context;
}