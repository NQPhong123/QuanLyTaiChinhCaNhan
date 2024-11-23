const URL_SEARCH = "SearchServlet";

// Hàm đẩy dữ liệu lên để tìm kiếm
export function pushData(categoryID, rangeDate, amountRange) {
    const searchData = {
        categoryID: categoryID,
        rangeDate: rangeDate,
        amountRange: amountRange,
    };
    console.log("Dữ liệu gửi lên:", JSON.stringify(searchData));

    return fetch(URL_SEARCH, { // Thay đổi: trả về Promise từ fetch
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
                console.log("Dữ liệu nhận được từ server:", data);
                return data; // Trả về dữ liệu cho các hàm khác sử dụng
            } else {
                throw new Error(data.message || "Lỗi không xác định");
            }
        })
        .catch((error) => {
            console.error("Lỗi:", error);
            throw error; // Truyền lỗi lên chuỗi gọi
        });
}


function pullTransaction(searchData) {
    // Ẩn bảng giao dịch JSP khi dữ liệu từ API JavaScript đang được tải
    document.getElementById("jsp-transaction-container").style.display = "none"; 

    fetch(URL_SEARCH, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Không thể lấy dữ liệu từ server");
            }
            return response.json();
        })
        .then((data) => {
            if (data.status === "success") {
                console.log("Dữ liệu trả về từ server:", data);

                // Hàm chuyển đổi định dạng ngày
                const formatDate = (rawDate) => {
                    if (Array.isArray(rawDate)) {
                        const [year, month, day] = rawDate;
                        return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                    } else if (typeof rawDate === "string") {
                        const [year, month, day] = rawDate.split(",");
                        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
                    } else {
                        console.error("Dữ liệu rawDate không hợp lệ:", rawDate);
                        return null;
                    }
                };

                const expenseTransactions = data.expenseList.map((item) => ({
                    date: formatDate(item.date),
                    amount: item.amount > 0 ? -item.amount : item.amount,
                    categoryID: item.categoryID,
                    categoryName: data.categoryName,
					URL_Image: data.URL_Image,
                }));

                const incomeTransactions = data.incomeList.map((item) => ({
                    date: formatDate(item.date),
                    amount: item.amount,
                    categoryID: item.categoryID,
                    categoryName: data.categoryName,
					URL_Image: data.URL_Image,
                }));

                const allTransactions = [...expenseTransactions, ...incomeTransactions];
                allTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

                let previousDate = null;
                let dailyTotal = 0;
                let dailyTransactionsHTML = "";
                const transactionContainer = document.getElementById("transaction-container");
                transactionContainer.innerHTML = ""; // Xóa nội dung cũ

				allTransactions.forEach((transaction) => {
				    const { date, categoryName, amount, URL_Image } = transaction;

				    // Debugging to check if the URL_Image exists
				    console.log("Category Image URL:", URL_Image);

				    // Fallback image if URL_Image is not available
				    const imageUrl = URL_Image || 'path_to_fallback_image.png';  // Use a fallback image if URL is missing

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
				            `<div class="transaction-head">
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
                // Hiển thị container chứa giao dịch từ JavaScript sau khi dữ liệu đã được xử lý
                transactionContainer.style.display = "block"; // Hiển thị container
            } else {
                console.error("Lỗi:", data.message);
            }
        })
        .catch((error) => {
            console.error("Lỗi:", error);
        });
		handleTransactionClick(transactionDiv, categoryName, amount, dateKey,URL_Image, decription);
}


