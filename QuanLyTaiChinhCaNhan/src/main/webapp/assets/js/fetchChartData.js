// Hàm cập nhật biểu đồ thu nhập
function updateRevenueChart(chart, data) {
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.values;
    chart.data.datasets[0].backgroundColor = data.backgroundColor;
    chart.update();
}

// Hàm cập nhật biểu đồ chi tiêu
function updateExpenseChart(chart, data) {
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.values;
    chart.data.datasets[0].backgroundColor = data.backgroundColor;
    chart.update();
}
// Hàm xóa dữ liệu biểu đồ cũ
function clearChart(chart) {
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.update();
}
// Hàm để ánh xạ categoryID thành categoryName
function mapCategoryIDToCategoryName(transactions, categories) {
    // Tạo Map để ánh xạ nhanh hơn
    const categoryMap = new Map(categories.map(cat => [String(cat.categoryID), cat.categoryName]));

    // Ánh xạ categoryID của mỗi giao dịch thành categoryName
    return transactions.map(tx => categoryMap.get(String(tx.categoryID)) || "Unknown");
}

// Hàm ánh xạ categoryID đến màu sắc
function mapCategoryIDToColor(categoryID, categoryMap) {
    // Tạo màu cho từng category ID bằng cách sử dụng vị trí của nó trong mảng
    const categoryIndex = Array.from(categoryMap.keys()).indexOf(String(categoryID));
    return colorArray[categoryIndex % colorArray.length]; // Sử dụng modulo để tránh lỗi tràn mảng
}

// Mảng màu sắc dùng để ánh xạ categoryID thành màu
const colorArray = ['#36a2eb', '#ff6384', '#4bc0c0', '#9966ff', '#ff9f40', '#ffcd56', '#ff7564'];

import { fetchCategories } from "./api/CategoryApi.js";




// Hàm xử lý dữ liệu từ server và cập nhật biểu đồ
export async function processChartData(responseData) {
	try {
	// Lấy danh sách categories từ API
    const categories = await fetchCategories();
    console.log("Categories:", categories); // Debug: Kiểm tra dữ liệu

    // Tạo một bản đồ để ánh xạ categoryID -> categoryName
    const categoryMap = new Map(categories.map(cat => [String(cat.categoryID), cat.categoryName]));

    // Tạo bản đồ ảnh cho các category (nếu chưa có)
	const categoryImageMap = new Map(categories.map(cat => [String(cat.categoryID), cat.urlimage]));

    // Ánh xạ categoryID của các giao dịch thu nhập và chi tiêu sang tên category
    const labelsIncomeArr = mapCategoryIDToCategoryName(responseData.incomeList, categories);
    const labelsExpenseArr = mapCategoryIDToCategoryName(responseData.expenseList, categories);

    console.log("Labels Income:", labelsIncomeArr); // Debug: Kiểm tra dữ liệu
    console.log("Labels Expense:", labelsExpenseArr); // Debug: Kiểm tra dữ liệu

    // Gộp các giá trị cùng loại
    const groupedIncomeData = groupTransactionsByCategory(responseData.incomeList, categoryMap);
    const groupedExpenseData = groupTransactionsByCategory(responseData.expenseList, categoryMap);

    // Phân tích dữ liệu thu nhập
    const incomeData = {
        labels: Array.from(groupedIncomeData.keys()).map(categoryID => categoryMap.get(categoryID)), // Tạo nhãn từ categoryName
        values: Array.from(groupedIncomeData.values()), // Lấy giá trị amount
        backgroundColor: Array.from(groupedIncomeData.keys()).map(categoryID => mapCategoryIDToColor(categoryID, categoryMap)), // Áp dụng màu sắc cho mỗi loại category
    };
    
    // Phân tích dữ liệu chi tiêu
    const expenseData = {
        labels: Array.from(groupedExpenseData.keys()).map(categoryID => categoryMap.get(categoryID)), // Tạo nhãn từ categoryName
        values: Array.from(groupedExpenseData.values()), // Lấy giá trị amount
        backgroundColor: Array.from(groupedExpenseData.keys()).map(categoryID => mapCategoryIDToColor(categoryID, categoryMap)), // Áp dụng màu sắc cho mỗi loại category
    };
    
    // Cập nhật tất cả các giao dịch thu nhập
    const incomeDetails = responseData.incomeList.map(income => ({
        categoryName: categoryMap.get(String(income.categoryID)),
        amount: income.amount,
		decription: income.decription,
        categoryID: income.categoryID,
		incomeID: income.incomeID,
        urlimage: categoryImageMap.get(String(income.categoryID)), // Lấy urlImage từ categoryImageMap
        date: income.date, // Giả sử income có thuộc tính `date`
    }));

    // Cập nhật tất cả các giao dịch chi tiêu
    const expenseDetails = responseData.expenseList.map(expense => ({
        categoryName: categoryMap.get(String(expense.categoryID)),
        amount: -Math.abs(expense.amount),
		decription: expense.decription,
        categoryID: expense.categoryID,
		expenseID: expense.expenseID,
        urlimage: categoryImageMap.get(String(expense.categoryID)), // Lấy urlImage từ categoryImageMap
        date: expense.date, // Giả sử expense có thuộc tính `date`
    }));

	const combinedDetails = [...incomeDetails, ...expenseDetails];
	updateCategoryDetails('allDetails', combinedDetails);
    // Cập nhật tổng thu nhập và chi tiêu
    const totalIncome = incomeData.values.reduce((a, b) => a + b, 0); // Tổng thu nhập
    const totalExpense = expenseData.values.reduce((a, b) => a + b, 0); // Tổng chi tiêu
    
    document.getElementById("incomeAmount").textContent = `+${totalIncome.toLocaleString()} đ`;
    document.getElementById("outcomeAmount").textContent = `-${totalExpense.toLocaleString()} đ`;
    const totalAmount = totalIncome - totalExpense;
    
    // Cập nhật tổng số tiền
    document.getElementById("totalAmountDisplay").textContent = `${totalAmount.toLocaleString()} đ`;

    // Xóa dữ liệu cũ trước khi cập nhật biểu đồ
    clearChart(revenueChart);
    clearChart(expenseChart);

    // Cập nhật các biểu đồ với màu sắc tương ứng
    updateRevenueChart(revenueChart, incomeData);
    updateExpenseChart(expenseChart, expenseData);

    // Cập nhật danh sách mô tả (nếu cần)
	}catch (error) {
	        console.error("Error processing chart data:", error);
	    }
}


export function updateCategoryDetails(elementId, transactions) {
    const detailsContainer = document.getElementById(elementId);
    detailsContainer.innerHTML = ''; // Clear previous content

    // Sort transactions by date
    transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Group transactions by date
    const groupedTransactions = transactions.reduce((acc, transaction) => {
        const dateKey = new Date(transaction.date).toDateString(); // Only take the date part
        if (!acc[dateKey]) acc[dateKey] = []; // If this date is not in the accumulator, initialize it
        acc[dateKey].push(transaction); // Add the transaction to the corresponding date
        return acc;
    }, {});

    // Loop through each day to display the transactions
    Object.keys(groupedTransactions).forEach(dateKey => {
        const dailyTransactions = groupedTransactions[dateKey];

        // Create container for each day
        const dailyContainer = document.createElement('div');
        dailyContainer.classList.add('transaction-day');
        detailsContainer.appendChild(dailyContainer);

        // Calculate total amount for the day
        const dailyTotal = dailyTransactions.reduce((sum, t) => sum + t.amount, 0);

        // Add day header
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('transaction-day-head');
        dateDiv.innerHTML = `<div class="date">${formatDate(dateKey)}</div>
                             <span class="amount total ${dailyTotal < 0 ? "negative" : "positive"}" >
                                Tổng: ${dailyTotal.toLocaleString()} đ
                             </span>`;
        dailyContainer.appendChild(dateDiv);

        // Display each transaction
        dailyTransactions.forEach(transaction => {
            const { categoryName, amount, urlimage, decription, expenseID, incomeID, categoryID} = transaction;
            const URL_Image = urlimage || 'path_to_fallback_image.png';

            const transactionDiv = document.createElement('div');
            transactionDiv.classList.add('transaction');
            transactionDiv.innerHTML = `<div class="icon">
                                            <img src="${URL_Image.startsWith('http') ? URL_Image : `image/${URL_Image}`}" alt="Category Image" />
                                        </div>
                                        <div class="details">
                                            <div class="category">${categoryName}</div>
                                            <div class="amount ${amount < 0 ? "negative" : "positive"}">
                                                ${amount.toLocaleString()} đ
                                            </div>
                                        </div>`;

            // Call the function to handle the click event on the icon
            handleTransactionClick(transactionDiv, categoryName, amount, dateKey,URL_Image, decription ,expenseID, incomeID,categoryID);

            dailyContainer.appendChild(transactionDiv);
        });
    });
}

function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
const DeleteTransactionServlet = "DeleteServlet";
const UpdateTransactionServlet = "UpdateServlet";
// Event listener to handle the click on the transaction
// Hàm xử lý khi người dùng nhấn vào giao dịch
// Hàm xử lý khi người dùng nhấn vào giao dịch
function handleTransactionClick(transactionDiv, categoryName, amount, dateKey, URL_Image, description, expenseID, incomeID, categoryID, transactionId, transactionType) {
    const iconDiv = transactionDiv.querySelector('.details');
    iconDiv.addEventListener('click', () => {
        const targetDiv = document.querySelector('.transaction-content');
        const existingDetail = document.querySelector('.detail-transaction');

        // Xóa khối detail-transaction nếu đã có
        if (existingDetail) {
            existingDetail.remove();
        }

        if (targetDiv) {
            targetDiv.style.margin = '0 0 0 250px';

            const newHTML = `
            <div class="detail-transaction"
                style="width: 500px; height: auto; margin: 20px 0 0 0; border: 1px solid #ccc; padding: 15px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-height: 300px; overflow-y: auto; font-size: 14px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <h2 style="font-size: 25px; margin: 0;">Thông Tin Chi Tiết</h2>
                    <div>
                        <a href="#" id="btn-del" style="color: red; text-decoration: none; margin-right: 5px;">XÓA</a>
                        <a href="#" id="btn-edit" style="color: green; text-decoration: none;">SỬA</a>
                    </div>
                </div>
                <div style="display: flex; align-items: center; margin: 10px 0;">
                    <img src="image/${URL_Image}" alt="icon" style="width: 50px; height: 50px; margin-right: 10px;">
                    <div>
                        <h3 style="font-size: 24px; margin: 0; text-align: left;">${categoryName}</h3>
                        <p style="color: gray; font-size: 20px; margin: 0;">Ghi chú: ${description}</p>
                        <p style="color: gray; font-size: 20px; margin: 0;">${formatDate(dateKey)}</p>
                    </div>
                </div>
                <div>
                    <p style="color: gray; font-size: 20px; margin: 0;">Chi tiết về giao dịch</p>
                    <h1 style="color: #00b2ff; font-size: 40px; margin: 5px 0;">${amount.toLocaleString()} đ</h1>
                </div>
            </div>`;

            targetDiv.insertAdjacentHTML('afterend', newHTML);

            // Xử lý sự kiện XÓA giao dịch
            const btnDel = document.getElementById('btn-del');
            btnDel.addEventListener('click', async () => {
                const confirmDelete = confirm("Bạn có chắc chắn muốn xóa giao dịch này?");
                if (confirmDelete) {
                    try {
                        const transactionID = expenseID || incomeID; // Sử dụng expenseID nếu có, không thì dùng incomeID
                        const type = expenseID ? "Expense" : "Income";
                        const response = await fetch(DeleteTransactionServlet, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                type: type, 
                                transactionID: transactionID,
                            }),
                        });

                        if (response.ok) {
                            alert("Giao dịch đã được xóa!");
                            transactionDiv.remove(); // Xóa giao diện
                            const detailToRemove = document.querySelector('.detail-transaction');
                            if (detailToRemove) detailToRemove.remove();
                        } else {
                            alert("Xóa giao dịch thất bại.");
                        }
                    } catch (error) {
                        console.error("Lỗi khi xóa giao dịch:", error);
                    }
                }
            });

            // Xử lý sự kiện SỬA giao dịch
            const btnEdit = document.getElementById('btn-edit');
            btnEdit.addEventListener('click', () => {
                // Tạo giao diện mới để chỉnh sửa giao dịch
                const editFormHTML = `
				<div class="edit-transaction-form" 
				     style="margin-top: 20px; padding: 20px; border: 1px solid #ccc; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
				            position: absolute; bottom: 0; right: 0; width: 100%; max-width: 500px; 
				            background-color: #fff; max-height: 300px; overflow-y: auto;">
                    <h3>Chỉnh Sửa Giao Dịch</h3>
                    <form id="edit-transaction-form">
                        <label>Tên thể loại:</label>
                        <select id="TypeOfTransaction" required>
                            <option value="" disabled selected>Chọn loại giao dịch</option>
                            <option value="expense">Chi tiêu</option>
                            <option value="income">Thu nhập</option>
                        </select>
                        <select class="expense-list" id="expenseCategory" required>
                            <option value="" selected>Chọn nhóm</option>
                        </select>
                        <select class="income-list hidden" id="incomeCategory" required>
                            <option value="" selected>Chọn nhóm</option>
                        </select>
                        <input type="text" id="edit-categoryName" value="${categoryName}" required />
                        <label>Số Tiền:</label>
                        <input type="number" id="edit-amount" value="${amount}" required />
                        <label>Ngày</label>
                        <input type="date" id="edit-date" value="${formatDate(dateKey)}" required />
                        <label>Ghi Chú:</label>
                        <input type="text" id="edit-description" value="${description}" />
                        <button type="submit" style="margin-top: 10px;">Cập Nhật</button>
                    </form>
                </div>`;

                // Chèn form chỉnh sửa vào giao diện mới
                const newTransactionFormDiv = document.createElement('div');
                newTransactionFormDiv.classList.add('new-edit-form-container');
                newTransactionFormDiv.innerHTML = editFormHTML;

                document.body.appendChild(newTransactionFormDiv); // Thêm form vào body hoặc bất kỳ container nào bạn muốn

                // Xử lý sự kiện submit form chỉnh sửa
                const editForm = document.getElementById('edit-transaction-form');
                editForm.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    const categoryName = document.getElementById('edit-categoryName').value;
                    const amount = parseFloat(document.getElementById('edit-amount').value);
                    const description = document.getElementById('edit-description').value;
                    const date = document.getElementById('edit-date').value;

                    try {
                        const transactionID = expenseID || incomeID; // Sử dụng expenseID nếu có, không thì dùng incomeID
                        const type = expenseID ? "Expense" : "Income";
                        const response = await fetch(UpdateTransactionServlet, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                categoryID: categoryID, 
                                date: date, 
                                amount: amount, 
                                description: description, 
                                type: type, 
                                transactionID: transactionID,
                            }),
                        });

                        if (response.ok) {
                            alert("Giao dịch đã được cập nhật!");
                            // Cập nhật giao diện
                            transactionDiv.querySelector('.category').textContent = categoryName;
                            transactionDiv.querySelector('.amount').textContent = `${amount.toLocaleString()} đ`;
                            const editFormContainer = document.querySelector('.new-edit-form-container');
                            if (editFormContainer) editFormContainer.remove(); // Xóa form sửa giao dịch sau khi cập nhật
                        } else {
                            alert("Cập nhật giao dịch thất bại.");
                        }
                    } catch (error) {
                        console.error("Lỗi khi cập nhật giao dịch:", error);
                    }
                });
            });
        }
    });
}




window.processChartData = processChartData;
// Hàm gộp các giao dịch cùng loại
function groupTransactionsByCategory(transactions, categoryMap) {
    const groupedData = new Map();
    transactions.forEach(tx => {
        const categoryID = String(tx.categoryID);
        const currentAmount = groupedData.get(categoryID) || 0;
        groupedData.set(categoryID, currentAmount + tx.amount);
    });
    return groupedData;
}

// Hàm lấy dữ liệu từ server
   function fetchChartData(selectedMonth) {
    fetch('ChartServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ month: selectedMonth })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Dữ liệu nhận từ server:", data); // In dữ liệu ra console để kiểm tra
            if (data.status === "success") {
                processChartData(data);
            } else {
                console.error("Error fetching chart data:", data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
window.fetchChartData = fetchChartData;

// Sử dụng khi người dùng chọn tab khác


// Tự động tải dữ liệu tháng hiện tại khi trang được tải
window.addEventListener('load', () => {
    fetchChartData(currentMonth);

});
