import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Topics from './pages/topics';
import TopicPage from './pages/topics/TopicPage';
import Settings from './pages/Settings';
import Residents from './pages/residents';
import ResidentPage from './pages/residents/ResidentPage';
import Quota from './pages/Quota';
import type { JSX } from 'react';
import { Profile, doLogout } from './services/Web3Service';

function Router() {

    type Props = {
        children: JSX.Element
    }

    function PrivateRoute({ children }: Props) {
        const isAuth = localStorage.getItem("account") !== null;
        return isAuth ? children : <Navigate to="/" />;
    }

    function ManagerRoute({ children }: Props) {
        const isAuth = localStorage.getItem("account") !== null;
        const isManager = parseInt(localStorage.getItem("profile") || "0") === Profile.MANAGER;

        if (isAuth && isManager)
            return children;
        else {
            doLogout();
            return <Navigate to="/" />;
        }
    }

    function CouncilRoute({ children }: Props) {
        const isAuth = localStorage.getItem("account") !== null;
        const isResident = parseInt(localStorage.getItem("profile") || "0") === Profile.RESIDENT;

        if (isAuth && !isResident)
            return children;
        else {
            doLogout();
            return <Navigate to="/" />;
        }
    }

    function ResidentRoute({ children }: Props) {
        const isAuth = localStorage.getItem("account") !== null;
        const isResident = parseInt(localStorage.getItem("profile") || "0") === Profile.RESIDENT;

        if (isAuth && isResident)
            return children;
        else {
            doLogout();
            return <Navigate to="/" />;
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/topics/edit/:title" element={
                    <PrivateRoute>
                        <TopicPage />
                    </PrivateRoute>
                } />
                <Route path="/topics/new" element={
                    <PrivateRoute>
                        <TopicPage />
                    </PrivateRoute>
                } />
                <Route path="/topics" element={
                    <PrivateRoute>
                        <Topics />
                    </PrivateRoute>
                } />
                <Route path="/settings" element={
                    <ManagerRoute>
                        <Settings />
                    </ManagerRoute>
                } />
                <Route path="/residents/edit/:wallet" element={
                    <ManagerRoute>
                        <ResidentPage />
                    </ManagerRoute>
                } />
                <Route path="/residents/new" element={
                    <CouncilRoute>
                        <ResidentPage />
                    </CouncilRoute>
                } />
                <Route path="/residents" element={
                    <CouncilRoute>
                        <Residents />
                    </CouncilRoute>
                } />
                <Route path="/quota" element={
                    <ResidentRoute>
                        <Quota />
                    </ResidentRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;