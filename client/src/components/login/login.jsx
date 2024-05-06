import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { useContext } from "react"
import { authContext } from "../providers/authProvider"
import { useNavigate } from "react-router-dom"

export const formSchema = z.object({
    userName: z.string().min(1, {
        message: "user name is required",
    }),
    password: z.string().min(1, {
        message: "password is required",
    }),
})

// const data = [
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
// ];

function Login() {
    const { login } = useContext(authContext)

    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            userName: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
    })
    const isLoading = form.formState.isSubmitting

    return (
        <div className="h-[100vh] w-[100vw] m-auto flex flex-col justify-center bg-[#eee]">
            <Dialog open={true}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-3xl  font-normal capitalize font-lobster ">
                            Instagram
                        </DialogTitle>
                        <DialogDescription className="text text-zinc-500">
                            Log in to instagram
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(
                                login.bind(null, navigate)
                            )}
                            className="space-y-8">
                            <div className="space-y-8 px-6">
                                <FormField
                                    control={form.control}
                                    name="userName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User Name:</FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your user name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password:</FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    // type="password"
                                                    placeholder="Enter your password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* {errors.apiError && <p className="text-red">{errors.apiError.message}</p>} */}
                            </div>
                            <DialogFooter className="bg-gray-100 px-6 py-4">
                                <Button
                                    variant={"outline"}
                                    disabled={isLoading}>
                                    login
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Login
