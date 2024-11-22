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
				</div>
			</div>
			<div style="display: flex; align-items: center; margin: 15px 0;">
				<img src="https://i.imgur.com/fHXvUeO.png" alt="icon" style="width: 30px; height: 30px; margin-right: 10px;">
				<div>
					<h3 style="font-size: 16px; margin: 0;">Salary</h3>
					<p style="color: gray; font-size: 14px; margin: 0;">Chi tiêu gia đình</p>
					<p style="color: gray; font-size: 12px; margin: 0;">Thứ hai, 10/06/2019</p>
				</div>
			</div>
			<div>
				<p style="color: gray; font-size: 14px; margin: 0;">Tiền lương của vợ</p>
				<h1 style="color: #00b2ff; font-size: 28px; margin: 5px 0;">+11,000,000.00</h1>
			</div>
		</div>`;

		// Insert the new detail-transaction after the targetDiv
		targetDiv.insertAdjacentHTML('afterend', newHTML);

		// Add event listener to the "XÓA" button to remove the detail-transaction
		const btnDel = document.getElementById('btn-del');
		btnDel.addEventListener('click', () => {
			const detailToRemove = document.querySelector('.detail-transaction');
			if (detailToRemove) {
				detailToRemove.remove();
			}
		});
	});
});


window.addEventListener("load", () => {
      document.querySelector(".loading-screen").style.display = "none";
      document.getElementById("content").style.display = "block";
    });
