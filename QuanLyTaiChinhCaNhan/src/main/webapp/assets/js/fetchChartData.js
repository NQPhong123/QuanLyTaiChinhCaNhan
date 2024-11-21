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
async function processChartData(responseData) {
    // Lấy danh sách categories từ API
    const categories = await fetchCategories();
    console.log("Categories:", categories); // Debug: Kiểm tra dữ liệu

    // Tạo một bản đồ để ánh xạ categoryID -> categoryName
    const categoryMap = new Map(categories.map(cat => [String(cat.categoryID), cat.categoryName]));

    // Ánh xạ categoryID của các giao dịch thu nhập và chi tiêu sang tên category
    const labelsIncomeArr = mapCategoryIDToCategoryName(responseData.incomes, categories);
    const labelsExpenseArr = mapCategoryIDToCategoryName(responseData.expenses, categories);

    console.log("Labels Income:", labelsIncomeArr); // Debug: Kiểm tra dữ liệu
    console.log("Labels Expense:", labelsExpenseArr); // Debug: Kiểm tra dữ liệu

    // Gộp các giá trị cùng loại
    const groupedIncomeData = groupTransactionsByCategory(responseData.incomes, categoryMap);
    const groupedExpenseData = groupTransactionsByCategory(responseData.expenses, categoryMap);

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
	
	// Cập nhật tổng thu nhập và chi tiêu
	    const totalIncome = incomeData.values.reduce((a, b) => a + b, 0); // Tổng thu nhập
	    const totalExpense = expenseData.values.reduce((a, b) => a + b, 0); // Tổng chi tiêu

	    document.getElementById("incomeAmount").textContent = `+${totalIncome.toLocaleString()} đ`;
	    document.getElementById("outcomeAmount").textContent = `-${totalExpense.toLocaleString()} đ`;
		// Tính tổng của totalIncome và totalExpense
		const totalAmount = totalIncome - totalExpense;

		// Cập nhật tổng vào một phần tử HTML mới (ví dụ là totalAmountDisplay)
		document.getElementById("totalAmountDisplay").textContent = `${totalAmount.toLocaleString()} đ`;

	
	// Xóa dữ liệu cũ trước khi cập nhật biểu đồ
	   clearChart(revenueChart);
	   clearChart(expenseChart);
    // Cập nhật các biểu đồ với màu sắc tương ứng
    updateRevenueChart(revenueChart, incomeData);
    updateExpenseChart(expenseChart, expenseData);

    // Cập nhật danh sách mô tả (nếu cần)

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
/*...*/