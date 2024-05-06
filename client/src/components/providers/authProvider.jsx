import { createContext, useCallback, useState } from "react"

export const authContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    login: () => {},
    data: {},
})

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [data, setData] = useState({})

    const login = useCallback(async (navigate, value) => {
        try {
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            })

            if (res.ok) {
                const data = await res.json()

                setData({
                    messages: data.directMessages,
                    id: data.id,
                    userName: value.userName,
                })
                setIsAuthenticated(true)

                navigate("/profile")
            } else {
                console.log(res.status)
                if (res.status === 401) {
                    const data = await res.json()

                    throw new Error(data.error)
                } else throw new Error("Something went wrong :(")
            }
        } catch (e) {
            alert(e)
            // navigate("/")
        }
    }, [])

    return (
        <authContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                login,
                data,
            }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider
