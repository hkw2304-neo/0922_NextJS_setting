'use client';

// 전역 유지할 데이터
import {createContext, ReactNode, useContext, useState} from "react";

interface UserContextType {
    sessionUserId: string;
    setSessionUserId: (id: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

// 앱 전체를 감싸줄 Provider 컴포넌트
export function UserSession({ children }: { children: ReactNode }) {
    const [sessionUserId, setSessionUserId] = useState('');

    return (
        <UserContext.Provider value={{ sessionUserId, setSessionUserId }}>
            {children}
        </UserContext.Provider>
    );
}

// 다른 화면에서 사용
export function useUser() {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("useUser는 <UserSession> 컴포넌트 내부에서만 사용할 수 있습니다.");
    }
    return context;
}