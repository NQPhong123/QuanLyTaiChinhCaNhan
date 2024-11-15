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
            /*pullTransaction();*/
        } else {
            console.error("Lỗi:", data.message);
        }
    })
    .catch((error) => {
        console.error("Lỗi:", error);
    });
}

// Hàm lấy dữ liệu từ server sau khi gửi dữ liệu thành công
export function pullTransaction() {
    fetch(URL_SEARCH, {
        method: 'POST',  
        headers: {
            "Content-Type": "application/json",
        }
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
            
            const transactionList = document.getElementById('transaction-list');
            const ul = document.createElement('ul');
            
            data.transactions.forEach((transaction) => {
                const li = document.createElement('li');
                
                // Xử lý rangeDate
                let formattedRangeDate = '';
                if (transaction.rangeDate && typeof transaction.rangeDate === 'object') {
                    const startDate = new Date(transaction.rangeDate.startDate).toLocaleDateString();
                    const endDate = new Date(transaction.rangeDate.endDate).toLocaleDateString();
                    formattedRangeDate = `Từ ${startDate} đến ${endDate}`;
                } else {
                    formattedRangeDate = transaction.rangeDate; // Nếu không phải đối tượng, dùng trực tiếp giá trị
                }

                // Xử lý amountRange
                let formattedAmountRange = '';
                if (transaction.amountRange && typeof transaction.amountRange === 'object') {
                    const min = transaction.amountRange.min; // Giả sử amountRange có thuộc tính min
                    const max = transaction.amountRange.max; // Giả sử amountRange có thuộc tính max
                    formattedAmountRange = `Từ ${min} đến ${max}`;
                } else {
                    formattedAmountRange = transaction.amountRange; // Nếu không phải đối tượng, dùng trực tiếp giá trị
                }

                li.textContent = `Ngày: ${formattedRangeDate}, Khoảng tiền: ${formattedAmountRange}, Mã loại: ${transaction.categoryID}`;
                ul.appendChild(li);
            });

            transactionList.appendChild(ul);
        } else {
            console.error("Lỗi:", data.message);
        }
    })
    .catch((error) => {
        console.error("Lỗi:", error);
    });
}
