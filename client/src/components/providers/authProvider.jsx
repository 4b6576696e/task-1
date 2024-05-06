import { createContext, useCallback, useState } from "react"

// interface IAuthContext {
//     credential: {
//         userName: string,
//         password: string,
//         id: string;
//     };
//     isAuthenticated: boolean;
//     setCredential: Dispatch<SetStateAction<{
//         userName: string;
//         password: string;
//         id: string;
//     }>>;
//     data: Object
//     setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
//     login: (navigate: NavigateFunction, value: z.infer<typeof formSchema>) => void;
// }

// const d = [
//     {
//         title: "xxsdfsdkjfbdsjfbsjkx",
//         chatters: { 2: "name" },
//         messages: [
//             {
//                 by: "1",
//                 msg_type: "text",
//                 content:
//                     "sjbiufsnfuisnfiwnfoiqeanfiowenfiwoqebfwuiebgwueibfiu sjbiufsnfuisnfiwnfoiqeanfiowenfiwoqebfwuiebgwueibfiusjbiufsnfuisnfiwnfoiqeanfiowenfiwoqebfwuiebgwueibfiu sdvjsndvjisdnfijsdnv sjdncsjd",
//             },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             {
//                 by: "2",
//                 msg_type: "text",
//                 content:
//                     "sjbiufsnfuisnfiwnfoiqeanfiowenfiwoqebfwuiebgwueibfiu sjbiufsnfuisnfiwnfoiqeanfiowenfiwoqebfwuiebgwueibfiusjbiufsnfuisnfiwnfoiqeanfiowenfiwoqebfwuiebgwueibfiu sdvjsndvjisdnfijsdnv sjdncsjd",
//             },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "2", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "2", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             {
//                 by: "1",
//                 msg_type: "media",
//                 content:
//                     "https://media.geeksforgeeks.org/wp-content/uploads/20210218220016/Screenshot20210218215957.png",
//             },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//             { by: "1", msg_type: "text", content: "sfsffs" },
//         ],
//     },
//     {
//         title: "xxx",
//         chatters: { 1: "name" },
//         messages: [{ by: "1", msg_type: "text", content: "sfsffs" }],
//     },
//     {
//         title: "xxx",
//         chatters: { 1: "name" },
//         messages: [{ by: "1", msg_type: "text", content: "sfsffs" }],
//     },
//     {
//         title: "sds",
//         chatters: { 1: "name" },
//         messages: [{ by: "1", msg_type: "text", content: "sfsffs" }],
//     },
// ]

export const authContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    login: () => {},
    data: {},
})

function AuthProvider({ children }) {
    // const { setValues } = useChatStore()
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

                // setValues(data.directMessages, data.id, value.userName)
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
