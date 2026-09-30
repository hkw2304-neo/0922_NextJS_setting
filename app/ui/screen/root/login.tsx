'use client'

import {useRouter} from "next/navigation";
import {useState} from "react";
import {useUser} from "@/app/util/session/UserSession";
import {CommonLabelInput, CommonButton} from "@/app/ui/component/commonComponent";

export default function LoginScreen() {

    const router = useRouter();

    const {setSessionUserId} = useUser();

    const [userId, setUserId] = useState<string>('');
    const [userPw, setUserPw] = useState<string>('');


    const handleLogin = (e: React.SubmitEvent) => {
        e.preventDefault();
        console.log("로그인 페이지 버튼 클릭");


        console.log("로그인 시도 데이터:", {userId, userPw});

        if (!userId || !userPw) {
            alert("아이디와 비밀번호를 모두 입력해 주세요.");
            return;
        }

        setSessionUserId(userId);

        // router.push("/home")
        router.replace("/home");
    }
    return (
        <div className="container-common">
            <h1>로그인 화면</h1>
            <form onSubmit={handleLogin}
                  className="form-common">

                <CommonLabelInput
                    id="userId" title={"아이디"} type={"text"} placeholder={"아이디 입력"} value={userId}
                    onChange={setUserId}
                />
                <CommonLabelInput
                    id="userPw" title={"비밀번호"} type={"password"} placeholder={"비밀번호 입력"} value={userPw}
                    onChange={setUserPw}
                />

                <CommonButton
                    type="submit"
                    title="로그인 및 홈 이동"
                />
            </form>
        </div>
    )
}