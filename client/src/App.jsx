import Login from "./components/login/login"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoutes from "./components/utils/ProtectedRoutes"
import UserProfile from "./components/userProfile/UserProfile"
import AuthProvider from "./components/providers/authProvider"

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Navigate to={"/login"} />} path="/" />

                    <Route element={<Login />} path="/login" />

                    <Route element={<ProtectedRoutes />}>
                        <Route element={<UserProfile />} path="/profile" />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
