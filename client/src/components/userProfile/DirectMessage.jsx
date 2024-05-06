
import { Button } from "../ui/button"
import { useChatStore } from "../../store/chat-store"
import ChatBox from "./ChatBox"

function DirectMessage({ data }) {
    const { onOpen } = useChatStore()

    return (
        <div className=" p-4 m-auto mt-9  rounded  flex flex-wrap gap-5 text-black justify-center">
            {data.map((d, i) => {
                return (
                    <div
                        key={i}
                        className="flex flex-row bg-slate-100 p-5 rounded justify-center items-center gap-2">
                        <p className="text-2xl bg-slate-200 px-2 rounded">
                            {d.title}
                        </p>
                        <Button
                            className="bg-black/70"
                            onClick={() => {
                                onOpen(d)
                            }}>
                            view chat
                        </Button>
                    </div>
                )
            })}
            <ChatBox />
        </div>
    )
}

export default DirectMessage
