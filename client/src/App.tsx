import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthProvider from "./contexts/AuthProvider";
import SetupProfile from "./pages/SetupProfile";
import FriendPage from "./pages/FriendPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/setup" element={<SetupProfile />} />
                    <Route path="/find-people" element={<FriendPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
