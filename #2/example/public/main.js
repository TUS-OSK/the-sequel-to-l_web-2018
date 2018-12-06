document.querySelector("#send").addEventListener("click", event => {
	axios.post("/post", {
		hoge: "fuga"
	})
	.then(res => {
		document.querySelector("#response").innerText += res.data
	})
})
