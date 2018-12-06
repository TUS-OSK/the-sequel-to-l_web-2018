const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use(express.static("public"))
app.use(bodyParser.json())

app.get("/ping", (req, res) => {
	res.send("pong")
})
app.post("/post", (req, res) => {
	console.log(req.body)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})
