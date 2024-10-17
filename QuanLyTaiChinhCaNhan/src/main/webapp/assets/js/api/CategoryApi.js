const URL_API = "CategoryServlet";
fetch(URL_API)
	.then(response => response.json())
	.then(data => {
		console.log(data);
	})
	.catch(error => console.error("error:", error))
