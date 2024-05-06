var express = require("express")
var router = express.Router()
const { IgApiClient } = require("instagram-private-api")

const ig = new IgApiClient()

const getDm = async (id) => {
    const dmFeed = ig.feed.directInbox(id)

    const dmItems = await dmFeed.items()

    const result = []

    dmItems.forEach((thread) => {
        const chatDetail = {
            title: thread.thread_title,
            chatters: {},
            messages: [],
        }

        // total no of people in chat in the format of { id: userName }
        thread.users.forEach((user) => {
            chatDetail.chatters[user.pk_id] = user.username
        })

        // total messages in chat in the format of { by: id, msg_type: string, content: string }
        thread.items.forEach((message) => {
            const id = message.user_id
            const msg = {
                by: id.toString(),
                msg_type: message.item_type,
            }

            if (message.item_type === "text") {
                msg.content = message.text

                chatDetail.messages.push(msg)
            }
            if (message.item_type === "media") {
                msg.content = message.media.image_versions2.candidates[0].url

                chatDetail.messages.push(msg)
            }
        })

        chatDetail.messages.reverse()
        result.push(chatDetail)
    })

    return result
}

const result = [
    {
        title: "cakedestroyer2024",
        chatters: {
            66727340457: "cakedestroyer2024",
        },
        messages: [
            {
                by: "66727340457",
                msg_type: "media",
                content:
                    "https://instagram.fixm4-3.fna.fbcdn.net/v/t1.15752-9/438231896_429483049812419_4451118061438133124_n.jpg?stp=dst-jpg_e15&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ZkEVoNXzodsQ7kNvgGE5J2v&_nc_ad=z-m&_nc_cid=0&_nc_ht=instagram.fixm4-3.fna&oh=03_Q7cD1QEdXEeGyQhOGKkJhzV_h8kmKcYMloGEwT1F6Kie5ILDaQ&oe=66601691",
            },
            {
                by: "66743659156",
                msg_type: "text",
                content: "Jakakak",
            },
        ],
    },
    {
        title: "Thorfin",
        chatters: {
            66338326556: "4b6576696ee",
        },
        messages: [
            {
                by: "66743659156",
                msg_type: "text",
                content: "Bob",
            },
        ],
    },
]

router.post("/", async (req, res, next) => {
    try {
        // console.log(req.body)
        const data = req.body
        ig.state.generateDevice(data.userName)

        const user = await ig.account.login(data.userName, data.password)

        const result = await getDm(user.pk)

        res.json({ id: user.pk_id, directMessages: result })

        // res.json({
        //     id: "66743659156",
        //     directMessages: result,
        // })
        // res.json({ id: "1" })
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "invalid credentials" })
    }
})

module.exports = router
