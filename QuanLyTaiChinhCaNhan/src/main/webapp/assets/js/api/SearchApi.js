const URL_SEARCH = "SearchServlet"; // URL đến servlet của bạn

export function pushData(date) {
	const searchData = {
		categoryID: "1",
		date: date, 
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
			// Xử lý dữ liệu trả về từ server nếu cần
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}