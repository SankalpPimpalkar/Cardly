import AuthContextProvider from '../context/AuthProvider'
import { Outlet } from 'react-router-dom'

export default function ProtectedLayout() {
    return (
        <AuthContextProvider>
            <Outlet />
        </AuthContextProvider>
    )
}
