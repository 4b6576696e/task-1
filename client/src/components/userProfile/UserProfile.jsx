import DirectMessage from "./DirectMessage"
import { useContext } from "react"
import { authContext } from "../providers/authProvider"

function UserProfile() {
    const { data } = useContext(authContext)

    console.log(data)

    return (
        <div className="min-h-[100vh] w-[100vw] bg-black/80 text-white pb-5">
            <div className="p-9  text-center">
                <span className="border-b-4 pb-2">
                    <span className="text-9xl font-lobster">Welcome</span>{" "}
                    &nbsp; <span className="text-4xl">@{data?.userName}</span>
                </span>
            </div>

            {/* <div className=""> */}
            <DirectMessage data={data.messages} />
            {/* </div> */}
        </div>
    )
}

export default UserProfile
