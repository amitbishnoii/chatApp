import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthProvider from "./contexts/AuthProvider";
import SetupProfile from "./pages/SetupProfile";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/setup" element={<SetupProfile />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
