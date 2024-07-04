import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/NotFound";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ChatPage from "./Pages/ChatPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={LandingPage}/>
                <Route path="*" Component={NotFound} />
                <Route path="/login" Component={LoginPage} />
                <Route path="/register" Component={RegisterPage} />
                <Route path="/chat" Component={ChatPage} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;