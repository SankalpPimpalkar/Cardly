import { createContext, useEffect, useState, useTransition } from "react";
import appwrite from "../lib/appwrite";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
    user: null,
    authenticated: false,
    is_loading: false,
    update_user: () => { }
})

export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)
    const [isPending, startTransition] = useTransition()
    const navigate = useNavigate()

    function update_user(data) {
        setUser(data)
    }

    useEffect(() => {
        startTransition(async () => {
            try {
                const { success, data } = await appwrite.GET_CURRENT_USER()

                if (success) {
                    setUser(data)
                    setAuthenticated(true)
                    return;
                }
            } catch (error) {
                return navigate('/auth/signin')
            }
        })
    }, [navigate])

    const values = {
        user: user,
        authenticated: authenticated,
        is_loading: isPending,
        update_user: update_user
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

