import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { authContext } from "../providers/authProvider"

function ProtectedRoutes() {
    const { isAuthenticated } = useContext(authContext)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
