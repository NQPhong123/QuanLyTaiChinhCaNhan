const URL_SEARCH = "SearchServlet";

// Hàm đẩy dữ liệu lên để tìm kiếm
export function pushData(categoryID, rangeDate, amountRange) {
    const searchData = {
        categoryID: categoryID,
        rangeDate: rangeDate,
        amountRange: amountRange
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
    .then((data) => {
        if (data.status === "success") {
            console.log("Success:", data);
            // Sau khi đẩy dữ liệu thành công, gọi hàm lấy dữ liệu
            pullTransaction(searchData);
        } else {
            console.error("Lỗi:", data.message);
        }
    })
    .catch((error) => {
        console.error("Lỗi:", error);
    });
}

function pullTransaction(searchData) {
    fetch(URL_SEARCH, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData)
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

            // Xử lý dữ liệu từ expenseList
            const expenseTransactions = data.expenseList.map((item) => ({
                date: item.date,
                amount: item.amount,
                categoryID: item.categoryID,
            }));

            // Xử lý dữ liệu từ incomeList
            const incomeTransactions = data.incomeList.map((item) => ({
                date: item.date,
                amount: item.amount,
                categoryID: item.categoryID,
            }));

            // Gộp cả hai danh sách
            const allTransactions = [...expenseTransactions, ...incomeTransactions];

            // Thay thế dữ liệu vào template string
            allTransactions.forEach(transaction => {
                const output = `
                    Dữ liệu ngày: ${transaction.date}
                    Dữ liệu danh mục: ${transaction.categoryID}
                    Dữ liệu số tiền: ${transaction.amount}
                `;
                console.log(output);
            });

            // Hoặc gọi hàm render nếu cần hiển thị
            renderTransactionList(allTransactions);
        } else {
            console.error("Lỗi:", data.message);
        }
    })
    .catch((error) => {
        console.error("Lỗi:", error);
    });
}

function renderTransactionList(transactions) {
    const transactionContainer = document.getElementById("transaction-container");
    transactionContainer.innerHTML = ""; // Xóa nội dung cũ

    let previousDate = null;
    let dailyTotal = 0;

    transactions.forEach(transaction => {
        const { date, categoryID, amount } = transaction;

        // Kiểm tra nếu ngày giao dịch đã thay đổi
        if (date !== previousDate) {
            // Nếu ngày giao dịch khác ngày trước đó, hiển thị tổng tiền của ngày trước đó
            if (previousDate !== null) {
                transactionContainer.innerHTML += `
                    <div class="transaction-day-total">
                        <span class="amount total ${dailyTotal < 0 ? "negative" : "positive"}">
                            Tổng: ${dailyTotal.toLocaleString()} đ
                        </span>
                    </div>
                `;
            }

            // Hiển thị ngày giao dịch mới
            const formattedDate = new Date(date);
            const formattedDateString = formattedDate.toLocaleDateString("vi-VN", { weekday: "long" });

            transactionContainer.innerHTML += `
                <div class="transaction-day">
                    <div class="transaction-day-head">
                        <div class="date">
                            ${formattedDate.toLocaleDateString("vi-VN")}
                            <span>${formattedDateString}</span>
                        </div>
                        <span class="amount total ${amount < 0 ? "negative" : "positive"}">
                            ${amount.toLocaleString()} đ
                        </span>
                    </div>
                </div>
            `;

            // Đặt lại tổng tiền hàng ngày
            dailyTotal = amount;
        } else {
            // Nếu ngày giao dịch không thay đổi, cộng dồn vào tổng tiền
            dailyTotal += amount;
        }

        // Hiển thị giao dịch
        transactionContainer.innerHTML += `
            <div class="transaction">
                <div class="details">
                    <div class="category">${categoryID}</div>
                    <div class="amount ${amount < 0 ? "negative" : "positive"}">
                        ${amount.toLocaleString()} đ
                    </div>
                </div>
            </div>
        `;

        // Cập nhật ngày giao dịch trước đó
        previousDate = date;
    });

    // Hiển thị tổng tiền của ngày cuối cùng nếu có giao dịch
    if (previousDate !== null) {
        transactionContainer.innerHTML += `
            <div class="transaction-day-total">
                <span class="amount total ${dailyTotal < 0 ? "negative" : "positive"}">
                    Tổng: ${dailyTotal.toLocaleString()} đ
                </span>
            </div>
        `;
    }
}


