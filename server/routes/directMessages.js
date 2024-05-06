var express = require("express")
var router = express.Router()

router.get("/", async (req, res) => {
    try {
        // const data = req.body

        // ig.state.generateDevice(data.userName)

        // const user = await ig.account.login(data.userName, data.password)

        // const dmFeed = ig.feed.directInbox(user.pk)
        // const dmItems = await dmFeed.items()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
})

module.exports = router
