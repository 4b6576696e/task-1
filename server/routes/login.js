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
