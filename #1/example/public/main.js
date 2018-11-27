document.querySelector("#send").addEventListener("click", event => {
	axios.get("/ping")
	.then(res => {
		document.querySelector("#response").innerText += res.data
	})
})
