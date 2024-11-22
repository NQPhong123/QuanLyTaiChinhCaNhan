const transactions = document.querySelectorAll('.transaction');

transactions.forEach(transaction => {
	transaction.addEventListener('click', () => {
		const targetDiv = document.querySelector('.transaction-content');
		const existingDetail = document.querySelector('.detail-transaction');

		// Remove existing detail-transaction if it exists
		if (existingDetail) {
			existingDetail.remove();
		}

		// Update margin for targetDiv
		targetDiv.style.margin = '0 0 0 250px';

		// Define the new HTML for the detail-transaction
		const newHTML = `
		<div class="detail-transaction"
			style="width: 500px; height: 300px; margin: 50px 0 0 0; border: 1px solid #ccc; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
			<div style="display: flex; align-items: center; justify-content: space-between;">
				<h2 style="font-size: 18px; margin: 0;">Số giao dịch</h2>
				<div>
					<a href="#" id="btn-del" style="color: red; text-decoration: none; margin-right: 10px;">XÓA</a>
					<a href="#" style="color: green; text-decoration: none;">SỬA</a>
