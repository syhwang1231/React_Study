import React from 'react';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import Profile from './pages/Profile';

const Profiles = () => {
    return (
        <div>
            <h3>사용자 목록:</h3>
            <ul>
                <li>
                    <Link to="/profiles/velopert">velopert</Link>
                </li>
                <li>
                    <Link to="/profiles/gildong">gildong</Link>
                </li>
            </ul>

            {/* <Routes>
                <Route
                    path="/profiles"
                    exact
                    render={() => <div>사용자를 선택해 주세요.</div>}
                    />
                <Route path="/profiles/:username" element={<Profile/>}/>
            </Routes> */}
            <Outlet/>
        </div>
    );
};

export default Profiles;