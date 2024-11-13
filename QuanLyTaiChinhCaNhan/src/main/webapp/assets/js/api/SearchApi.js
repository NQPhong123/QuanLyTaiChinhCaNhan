
const URL_SEARCH = "SearchServlet"; 
// hàm đẩy dữ liệu lên để tìm kiếm
export function pushData(categoryID, rangeDate, amountRange) {
	const searchData = {
		categoryID: categoryID,
		rangeDate: rangeDate,
		amountRange: amountRange
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
				throw new Error("đẩy dữ liệu để search không thành công");
			}
			return response.json();
		})
		.then((data) => {
			if(data.status==="success"){
				console.log("Success:", data);
			}else{
				console.error("loi",data.message);
			}
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