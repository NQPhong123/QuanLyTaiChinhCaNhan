const URL_SaveTransactionServlet = "SaveTransaction";
// hàm này dùng để đẩy dữ liệu của user đã nhập vào và đẩy qua java để lưu vào database
export function pushDataForSaveTran(transactionType, categoryID, amount, date, decription) {
	const TransactionData = {
		transactionType: transactionType,
		categoryID: categoryID,
		amount: amount,
		date: date,
		decription
	};
	fetch(URL_SaveTransactionServlet,{
		method:"POST",
		headers:{
			"Content-Type": "application/json",
		},
		body: JSON.stringify(TransactionData),
	})
	.then((response) =>{
		if(!response.ok){
			throw new Error("Addtransaction failed");
		}
		return response.json();
	})
	.then(data =>{
		if(data.status === "success"){
			alert("lưu giao dịch thành công");
		}else{
			alert("lưu giao dịch thất bại" + data.message);
		}
	})
	.catch((error) => {
		console.error("Add Tran Error:", error);
	});
	
}