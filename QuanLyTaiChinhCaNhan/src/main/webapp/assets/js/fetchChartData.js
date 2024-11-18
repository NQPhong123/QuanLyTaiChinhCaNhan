// Hàm cập nhật biểu đồ thu nhập
function updateRevenueChart(chart, data) {
	chart.data.labels = data.labels;
	chart.data.datasets[0].data = data.values;
	chart.update();
}

// Hàm cập nhật biểu đồ chi tiêu
function updateExpenseChart(chart, data) {
	chart.data.labels = data.labels;
	chart.data.datasets[0].data = data.values;
	chart.update();
}

// Hàm để ánh xạ categoryID thành categoryName
function mapCategoryIDToCategoryName(transactions, categories) {
	// Tạo Map để ánh xạ nhanh hơn
	const categoryMap = new Map(categories.map(cat => [String(cat.categoryID), cat.categoryName]));

	// Ánh xạ categoryID của mỗi giao dịch thành categoryName
	return transactions.map(tx => categoryMap.get(String(tx.categoryID)) || "Unknown");
}

import { fetchCategories } from "./api/CategoryApi.js";

// Hàm xử lý dữ liệu từ server và cập nhật biểu đồ
async function processChartData(responseData) {
	// Lấy danh sách categories từ API
	const categories = await fetchCategories();
	console.log("Categories:", categories); // Debug: Kiểm tra dữ liệu

	// Lấy labels của các giao dịch thu nhập và chi tiêu
	const labelsIncomeArr = mapCategoryIDToCategoryName(responseData.incomes, categories);
	const labelsExpenseArr = mapCategoryIDToCategoryName(responseData.expenses, categories);

	console.log("Labels Income:", labelsIncomeArr); // Debug: Kiểm tra dữ liệu
	console.log("Labels Expense:", labelsExpenseArr); // Debug: Kiểm tra dữ liệu

	// Phân tích dữ liệu thu nhập
	const incomeData = {
		labels: labelsIncomeArr, // Tạo nhãn từ category
		values: responseData.incomes.map(income => income.amount), // Lấy giá trị amount
	};

	// Phân tích dữ liệu chi tiêu
	const expenseData = {
		labels: labelsExpenseArr, // Tạo nhãn từ category
		values: responseData.expenses.map(expense => expense.amount), // Lấy giá trị amount
	};

	// Cập nhật các biểu đồ
	updateRevenueChart(revenueChart, incomeData);
	updateExpenseChart(expenseChart, expenseData);

	// Cập nhật tổng thu nhập và chi tiêu
	const totalIncome = incomeData.values.reduce((a, b) => a + b, 0); // Tổng thu nhập
	const totalExpense = expenseData.values.reduce((a, b) => a + b, 0); // Tổng chi tiêu

	document.getElementById("incomeAmount").textContent = `+${totalIncome.toLocaleString()} đ`;
	document.getElementById("outcomeAmount").textContent = `-${totalExpense.toLocaleString()} đ`;

	// Cập nhật danh sách mô tả (nếu cần)
	updateDescriptionList(incomeData.labels, expenseData.labels);
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

// Sử dụng khi người dùng chọn tab khác
function showTabAndFetchData(tab) {
	const tabs = document.querySelectorAll('.tab');
	tabs.forEach(t => t.classList.remove('active'));

	let selectedMonth;
	if (tab === 'last') {
		tabs[0].classList.add('active');
		selectedMonth = lastMonth;
	} else if (tab === 'current') {
		tabs[1].classList.add('active');
		selectedMonth = currentMonth;
	} else {
		tabs[2].classList.add('active');
		selectedMonth = nextMonth;
	}

	fetchChartData(selectedMonth);
}

// Tự động tải dữ liệu tháng hiện tại khi trang được tải
window.addEventListener('load', () => {
	fetchChartData(currentMonth);
});
