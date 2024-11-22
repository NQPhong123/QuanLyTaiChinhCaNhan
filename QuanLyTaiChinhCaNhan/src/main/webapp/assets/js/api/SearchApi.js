const URL_SEARCH = "SearchServlet";


// Hàm đẩy dữ liệu lên để tìm kiếm
export function pushData(categoryID, rangeDate, amountRange, categoryName, URL_Image) {
	const searchData = {
		categoryID: categoryID,
		rangeDate: rangeDate,
		amountRange: amountRange,
		URL_Image: URL_Image,
		categoryName: categoryName,
	};
	console.log("Dữ liệu gửi lên:", JSON.stringify(searchData));

	fetch(URL_SEARCH, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(searchData),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Đẩy dữ liệu để tìm kiếm không thành công");
			}
			return response.json();
		})
		.then(data => {
			if (data.status === "success") {
				console.log("dữ liệu server trả về");
				return data;
			}
		})
		.catch((error) => {
			console.error("Lỗi:", error);
		});
}


function processTransactions(allTransactions, transactionContainer) {
	let previousDate = null;
	let dailyTotal = 0;
	let dailyTransactionsHTML = "";

	allTransactions.forEach((transaction) => {
		const { date, categoryName, amount, URL_Image } = transaction;

		// Debugging to check if the URL_Image exists
		console.log("Category Image URL:", URL_Image);

		// Fallback image if URL_Image is not available
		const imageUrl = URL_Image || 'path_to_fallback_image.png';

		if (date !== previousDate) {
			if (previousDate !== null) {
				transactionContainer.innerHTML +=
					`<div class="transaction-day">
                        <div class="transaction-day-head">
                            <div class="date">
                                ${new Date(previousDate).toLocaleDateString("vi-VN")}
                                <span>${new Date(previousDate).toLocaleDateString("vi-VN", { weekday: "long" })}</span>
                            </div>
                            <span class="amount total ${dailyTotal < 0 ? "negative" : "positive"}">
                                Tổng: ${dailyTotal.toLocaleString()} đ
                            </span>
                        </div>
                        <div class="transactions">
                            ${dailyTransactionsHTML}
                        </div>
                    </div>`;
			}

			previousDate = date;
			dailyTotal = amount;
			dailyTransactionsHTML =
				`<div class="transaction">
                    <div class="icon">
                        <img src="image/${imageUrl}" alt="Category Image" />
                    </div>
                    <div class="details">
                        <div class="category">${categoryName}</div>
                        <div class="amount ${amount < 0 ? "negative" : "positive"}">
                            ${amount.toLocaleString()} đ
                        </div>
                    </div>
                </div>`;
		} else {
			dailyTotal += amount;
			dailyTransactionsHTML +=
				`<div class="transaction">
                    <div class="icon">
                        <img src="image/${imageUrl}" alt="Category Image" />
                    </div>
                    <div class="details">
                        <div class="category">${categoryName}</div>
                        <div class="amount ${amount < 0 ? "negative" : "positive"}">
                            ${amount.toLocaleString()} đ
                        </div>
                    </div>
                </div>`;
		}
	});

	if (previousDate !== null) {
		transactionContainer.innerHTML +=
			`<div class="transaction-day">
                <div class="transaction-day-head">
                    <div class="date">
                        ${new Date(previousDate).toLocaleDateString("vi-VN")}
                        <span>${new Date(previousDate).toLocaleDateString("vi-VN", { weekday: "long" })}</span>
                    </div>
                    <span class="amount total ${dailyTotal < 0 ? "negative" : "positive"}">
                        Tổng: ${dailyTotal.toLocaleString()} đ
                    </span>
                </div>
                <div class="transactions">
                    ${dailyTransactionsHTML}
                </div>
            </div>`;
	}
}

