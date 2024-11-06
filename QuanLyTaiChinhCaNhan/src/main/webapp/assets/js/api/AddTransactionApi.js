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
			throw new Error("Addtransaction faile");
		}
		return response.json();
	})
	.then(data =>{
		console.log("Add Tran Success", data);
	})
	.catch((error) => {
		console.error("Add Tran Error:", error);
	});
	
}