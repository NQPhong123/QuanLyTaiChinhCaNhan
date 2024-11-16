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
            
            // Tạo mảng transactions chỉ với 3 trường cần thiết
            const transactions = [
                {
                    categoryID: data.categoryID,
                    rangeDate: data.rangeDate,
                    amountRange: data.amountRange
                }
            ];

            renderTransactionList(transactions);
        } else {
            console.error("Lỗi:", data.message);
        }
    })
    .catch((error) => {
        console.error("Lỗi:", error);
    });
}

const dummyData = [
    { categoryID: 1, rangeDate: { startDate: [2024, 1, 1], endDate: [2024, 1, 31] }, amountRange: { min: 100, max: 500 } },
    { categoryID: 2, rangeDate: { startDate: [2024, 2, 1], endDate: [2024, 2, 28] }, amountRange: { min: 200, max: 800 } }
];
renderTransactionList(dummyData);//tét thử renderTransactionListr có chạy ko 


// Hàm hiển thị danh sách giao dịch
function renderTransactionList(transactions) {
    const transactionList = document.getElementById('transaction-list');
    
    // Kiểm tra nếu transactions không hợp lệ hoặc rỗng
    if (!Array.isArray(transactions) || transactions.length === 0) {
        console.error("Dữ liệu transactions không hợp lệ hoặc rỗng:", transactions);
        transactionList.innerHTML = "<p>Không có giao dịch nào để hiển thị.</p>";
        return;
    }

    // Xóa nội dung cũ trước khi thêm mới
    transactionList.innerHTML = '';

    const ul = document.createElement('ul');

    transactions.forEach((transaction) => {
        const li = document.createElement('li');

        // Xử lý rangeDate
        let formattedRangeDate = '';
        if (transaction.rangeDate && typeof transaction.rangeDate === 'object') {
            const endDate = transaction.rangeDate.endDate ? new Date(transaction.rangeDate.endDate.join('-')).toLocaleDateString() : 'Không xác định';
            const startDate = transaction.rangeDate.startDate ? new Date(transaction.rangeDate.startDate.join('-')).toLocaleDateString() : 'Không xác định';
            formattedRangeDate = `Từ ${startDate} đến ${endDate}`;
        } else {
            formattedRangeDate = 'Không xác định';
        }

        // Xử lý amountRange
        let formattedAmountRange = '';
        if (transaction.amountRange && typeof transaction.amountRange === 'object') {
            const max = transaction.amountRange.max !== undefined ? transaction.amountRange.max : 'Không xác định';
            const min = transaction.amountRange.min !== undefined ? transaction.amountRange.min : 'Không xác định';
            formattedAmountRange = `Từ ${min} đến ${max}`;
        } else {
            formattedAmountRange = 'Không xác định';
        }

        li.textContent = `Ngày: ${formattedRangeDate}, Khoảng tiền: ${formattedAmountRange}, Mã loại: ${transaction.categoryID}`;
        ul.appendChild(li);
    });

    transactionList.appendChild(ul);
}

