import React from 'react';
import { Navigate } from 'react-router-dom';

const MyPage = () => {
    const isLoggedIn = false;  // 로그인 상태에 따라 true 또는 false를 가르킨다고 가정

    if(!isLoggedIn){
        return <Navigate to="/login" replace={true} />;
    }
    return <div>마이 페이지</div>;
};

export default MyPage;