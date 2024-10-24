const URL_CategoryServlet = "CategoryServlet";
// lấy dữ liệu từ CategoryServlet
export function fetchCategories() {
	return fetch(URL_CategoryServlet)
		.then(response => response.json())
		.catch(error => {
			console.error("error:", error);
			throw error;
		}
		);
}
