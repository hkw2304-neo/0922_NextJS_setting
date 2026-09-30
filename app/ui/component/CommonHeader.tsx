'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {useUser} from "@/app/util/session/UserSession";
import {CommonButton} from "@/app/ui/component/commonComponent";

export default function CommonHeader() {
    const router = useRouter();
    const { sessionUserId, setSessionUserId } = useUser();

    const handleLogout = () => {
        setSessionUserId(''); // 세션 초기화
        router.replace('/');  // 로그인 화면으로 이동 (스택 교체)
    };

    return (
        <header className="header-container">
            <div className="header-logo">
                <Link href={process.env.NEXT_PUBLIC_BASE_HOME_URL ?? '/'}>SpaceFit AI</Link>
            </div>

            <div className="header-title">
                <span>스캔피트룸</span>
            </div>

            <div className="header-user-info">
                {sessionUserId ? (
                    <>
            <span className="user-nickname">
              <strong>{sessionUserId}</strong> 님
            </span>
                        <span className="divider">|</span>
                        <Link href="/home/detail" className="header-link">내 정보</Link>
                        <span className="divider">|</span>
                        <CommonButton
                            type="button"
                            title="로그아웃"
                            className="logout-btn"
                            onClick={handleLogout}
                        />
                    </>
                ) : (
                    <Link href="/" className="header-link">로그인</Link>
                )}
            </div>
        </header>
    );
}