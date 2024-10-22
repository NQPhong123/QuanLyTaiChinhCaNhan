
const URL_SEARCH = "SearchServlet"; 
export function pushData(categoryID, date, amount) {
	const searchData = {
		categoryID: categoryID,
		date: date,
		amount: amount
	};

	fetch(URL_SEARCH, {
		method: "POST", // Định nghĩa phương thức HTTP
		headers: {
			"Content-Type": "application/json", // Định dạng dữ liệu là JSON
		},
		body: JSON.stringify(searchData), // Chuyển đổi đối tượng JavaScript thành JSON
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log("Success:", data);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

export function pullTransaction(){
	fetch(URL_SEARCH)
	.then(response => response.json())
	.then(data =>{
		console.log(data);
	})
	.catch(error =>{
		console.error("Error:", error);
	})
}