import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { useChatStore } from "../../store/chat-store"
import { ScrollArea } from "../ui/scroll-area"
import { DialogTitle } from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { useContext } from "react"
import { authContext } from "../providers/authProvider"

const ChatBox = () => {
    const { data: d } = useContext(authContext)
    const { isOpen, onClose, data } = useChatStore()

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader className=" px-6">
                        <DialogTitle className="text-3xl  font-normal capitalize font-lobster ">
                            <span className="w-fit break-all">
                                {data.title}
                            </span>
                        </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-96  rounded-md border p-3">
                        <div className="">
                            {data.messages &&
                                data?.messages?.reverse().map((msg, i) => {
                                    return (
                                        <p
                                            key={i}
                                            className={cn(
                                                "w-fit px-5 py-2 mb-3 break-all",
                                                {
                                                    "ml-auto  own-chat bg-slate-300":
                                                        d?.id === msg.by,
                                                    "mr-auto other-chat bg-indigo-600 text-white":
                                                        d?.id !== msg.by,
                                                }
                                            )}>
                                            {Object.keys(data.chatters).length >
                                                1 &&
                                                d?.id !== msg.by && (
                                                    <span className="text-white font-bold">
                                                        {data.chatters[msg.by]}
                                                        <br />
                                                    </span>
                                                )}
                                            {msg.msg_type === "text" &&
                                                msg.content}
                                            {msg.msg_type === "media" && (
                                                <a
                                                    href={msg.content}
                                                    target="_blank"
                                                    className="text-white font-bold w-5 h-5">
                                                    <svg
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        height="2em"
                                                        width="2em">
                                                        <path d="M0 4c0-1.1.9-2 2-2h16a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm11 9l-3-3-6 6h16l-5-5-2 2zm4-4a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                    {/* <span>img</span> */}
                                                </a>
                                            )}
                                        </p>
                                    )
                                })}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ChatBox
